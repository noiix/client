import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import baseUrl from "../config";
import {useNavigate} from 'react-router-dom'
import DesignContext from "../contexts/DesignContext";
import UserContext from "../contexts/UserContext";
import useLocalStorage from "use-local-storage";
import io from 'socket.io-client';

// const socket = io();

// const socket = io(baseUrl, { transports: ["websocket", "polling"] });

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const API = axios.create({ baseUrl: baseUrl });

    const {currentUser} = useContext(UserContext);
    const { addNewNotification } = useContext(DesignContext);

    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState({})
    const [fetchAgain, setFetchAgain] = useState(false)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState();
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [chatNotification, setChatNotification] = useState([]);
    const [unreadCounter, setCounter] = useState(0);

     // socket.io
     const [socketConnected, setSocketConnected] = useState(false)

     const ENDPOINT = `${baseUrl}`;
     let socket = useRef();
     let selectedChatCompare = useRef();
 
     useEffect(() => {
         socket.current = io(ENDPOINT);
         socket.current.emit('setup', currentUser)
         socket.current.on('connected', () => {
             setSocketConnected(true)
         })
         socket.current.on('typing', () => setIsTyping(true))
         socket.current.on('stop typing', () => setIsTyping(false))
     }, [])

     useEffect(() => {
        fetchMessages();
        selectedChatCompare.current = selectedChat;
    }, [selectedChat]);

    // useEffect(() => {
    //     const sortedChats = chats.sort((a, b) => a.updatedAt - b.updatedAt);
    //     console.log('chats from sort chats', chats)
    //     console.log('sortedChats', sortedChats);
    //     setSelectedChat(sortedChats[0]);
    // }, []);

    console.log('selectdChat', selectedChat)

     useEffect(() => {
        socket.current.on('message received', (newMessageReceived) => {
            messages.forEach((msg) => msg.read === false ? setCounter(unreadCounter +1) : msg)
            if(!selectedChatCompare.current || selectedChatCompare.current._id !== newMessageReceived.chat._id){
                if(!chatNotification.includes(newMessageReceived)) {
                    setChatNotification([newMessageReceived, ...chatNotification])
                    setFetchAgain(!fetchAgain);
                }
            }else {
                setMessages([...messages, newMessageReceived])
            }
        })
    }, [socket.current, messages])

    console.log('chat notifications', chatNotification)
    console.log('counter', unreadCounter)
    console.log('messages', messages);


    const fetchChats = () => {
        API.get(`${baseUrl}/chat`, { withCredentials: true})
        .then(response => {
            if(response.data) {
                setChats(response.data)
            }
            // addNewNotification(response.notification)
           
        })
    }

    // join chat room 
    const accessChat = (userId) => {
        API.post(`${baseUrl}/chat`, {userId}, {withCredentials: true})
        .then(response => {
            if(!chats.find((chat) => chat._id === response.data._id)) {
                setSelectedChat(response.data);
                setChats([response.data, ...chats])
            }
        })
    }

    const sendMessage = (e) => {
        e.preventDefault()
        if(newMessage) {
            socket.current.emit('stop typing', selectedChat._id)
            API.post(`${baseUrl}/messages`, {content: newMessage, chatId: selectedChat._id}, {withCredentials: true})
            .then(response => {
                setNewMessage('');
                console.log('sendMessage', response.data)
                socket.current.emit('new message', response.data)
                setMessages([...messages, response.data])

            })
            .catch(err => console.log(err))
        }
    }

    const sendMessageOnKeyDown = (e) => {
        if(e.key === "Enter") {
          sendMessage(e)
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)

        if(!socketConnected) return;

        if(!typing) {
            setTyping(true)
            socket.current.emit('typing', selectedChat._id);
        }
        let lastTypingTime = new Date().getTime()
        let timerLength = 3000;
        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - lastTypingTime;
            if(timeDiff >= timerLength && typing) {
                socket.current.emit('stop typing', selectedChat._id);
                setTyping(false);
            }
        }, timerLength)
    }

    const fetchMessages = () => {
        if(!selectedChat) return

        API.get(`${baseUrl}/messages/${selectedChat._id}`, {withCredentials: true})
        .then(response => {
            console.log('my messages', messages)
            setMessages(response.data);
            socket.current.emit('join chat', selectedChat._id);
        })
        .catch(err => console.log(err)) 
    }

    useEffect(() => {
        if(currentUser) {
            fetchChats()
            const sortedChats = chats.sort((a, b) => a.updatedAt - b.updatedAt);
            // setSelectedChat(sortedChats[0]);
            setChats(sortedChats);
        }
    }, [currentUser, fetchAgain])

    const isSenderCurrentUser = (message) => {
        return (
          message.sender._id === currentUser._id
        )
    }

    const setMessageToRead = () => {
        const chatId = {chatId: selectedChat._id}
        API.patch(`${baseUrl}/messages/read`, chatId, { withCredentials: true})
        .then(response => {
            console.log('response from update read', response)
            setMessages(response.data.result)
        })
    }

    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].username : users[0].username;
      };
   

    const value = { accessChat, chats, setSelectedChat, selectedChat, messages, typingHandler, sendMessage, sendMessageOnKeyDown, isSenderCurrentUser, isTyping, chatNotification, setChatNotification, getSender, setCounter, unreadCounter, setMessageToRead}

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export default ChatContext;