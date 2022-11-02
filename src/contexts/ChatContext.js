import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import baseUrl from "../config";
import {useLoaderData, useNavigate} from 'react-router-dom'
import DesignContext from "../contexts/DesignContext";
import UserContext from "../contexts/UserContext";
import io from 'socket.io-client';
import { MdScanner } from "react-icons/md";
import useLocalStorage from "use-local-storage";

// const socket = io();

// const socket = io(baseUrl, { transports: ["websocket", "polling"] });

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const API = axios.create({ baseUrl: baseUrl });

    const {currentUser} = useContext(UserContext);
    const { addNewNotification } = useContext(DesignContext);

    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState();
    const [fetchAgain, setFetchAgain] = useState(false)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState();
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [chatNotification, setChatNotification] = useState([]);
    const [counter, setCounter] = useState(0);
    const [firstMessage, setFirstMessage] = useLocalStorage('firstMessage', [])

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
         socket.current.on('typing', (chatId) => setIsTyping(chatId))
         socket.current.on('stop typing', () => setIsTyping(false))
     }, [])

     useEffect(() => {
        fetchMessages();
        selectedChatCompare.current = selectedChat;
    }, [selectedChat])

     useEffect(() => {
        socket.current.on('message received', (newMessageReceived) => {
            if(!selectedChatCompare.current || selectedChatCompare.current._id !== newMessageReceived.chat._id){
                if(!chatNotification.includes(newMessageReceived)) {
                    setChatNotification([...chatNotification, newMessageReceived])
                    setFetchAgain(!fetchAgain);
                }
               
            }else {
                setMessages([...messages, newMessageReceived])
            }
        })
    }, [socket.current, messages])

    // console.log('chat notifications', chatNotification)
    // console.log('counter', counter)


    const fetchChats = () => {
        API.get(`${baseUrl}/chat`, { withCredentials: true })
        .then(response => {
            if(response.data) {
                setChats(response.data)
                const sortedChats = response.data.sort((a, b) => a.updatedAt - b.updatedAt);
                // setSelectedChat(sortedChats[0]);
                setChats(sortedChats);
            }
            // addNewNotification(response.notification)
           
        })
    }

    // join chat room 
    const accessChat = (userId) => {
        console.log('access chat', userId)
        API.post(`${baseUrl}/chat`, {userId}, {withCredentials: true})
        .then(response => {
            if(!chats.find((chat) => chat._id === response.data._id)) {
                setSelectedChat(response.data);
                setChats([response.data, ...chats])
            }
        })
    }

    const sendMessageOnKeyDown = (e) => {
        if(e.key === "Enter") {
          sendMessage(e)
        }
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
        }
    }, [currentUser, fetchAgain])
    
    console.log('chats:', chats)
    useEffect(() => {
        if(Object.keys(currentUser).length > 0){
            initialChatBot()
            initialMessage()
        }
    }, [currentUser])

    const isSenderCurrentUser = (message) => {
        return (
          message.sender._id === currentUser._id
        )
    }

    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].username : users[0].username;
      };

    const initialChatBot = () => {
        // const isChat = chats.filter(chat => chat.users.map(user => user._id === currentUser._id));
        // console.log('isChat.length:', isChat.length)
        /*isChat.length === 0 && */ API.get(`${baseUrl}/chat/chatbot`, {withCredentials: true})
        .then(response => {
            console.log('initial chat', response.data)
            setSelectedChat(response.data);
            setChats([response.data]);
        })
    }

    const initialMessage = () => {
        const message = {content: `Hi, ${currentUser.username}! Nice to see you here. Don't forget to set your genres and profile so that you can find other musicians in your area. Have fun!`}
        API.post(`${baseUrl}/messages/initialmessage`, {content: message.content}, {withCredentials: true})
        .then(response => {
            console.log('initial message', response.data)
            setFirstMessage([...firstMessage, response.data])
        })
    }

    const value = { accessChat, chats, setSelectedChat, selectedChat, messages, typingHandler, sendMessage, sendMessageOnKeyDown, isSenderCurrentUser, isTyping, chatNotification, setChatNotification, getSender, setCounter, counter, firstMessage}

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export default ChatContext;