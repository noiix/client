import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import baseUrl from "../config";
import {useNavigate} from 'react-router-dom'
import DesignContext from "../contexts/DesignContext";
import UserContext from "../contexts/UserContext";
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

     // socket.io
     const [socketConnected, setSocketConnected] = useState(false)

     const ENDPOINT = `${baseUrl}`;
     let socket = useRef();
     let selectedChatCompare;
 
     useEffect(() => {
         socket.current = io(ENDPOINT);
         socket.current.emit('setup', currentUser)
         socket.current.on('connection', () => {
             setSocketConnected(true)
         })
     }, [])

     useEffect(() => {
        socket.current.on('message received', (newMessageReceived) => {
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
                //set notification
            }else {
                setMessages([...messages, newMessageReceived])
            }
        })
    })

    const fetchChats = () => {
        API.get(`${baseUrl}/chat`, { withCredentials: true})
        .then(response => {
            if(response.data) {
                setChats(response.data)
            }
            // addNewNotification(response.notification)
           
        })
    }

    const accessChat = (userId) => {
        API.post(`${baseUrl}/chat`, {userId}, {withCredentials: true})
        .then(response => {
            if(!chats.find((chat) => chat._id === response.data._id)) {
                setChats([response.data, ...chats])
                setSelectedChat(response.data);
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
            API.post(`${baseUrl}/messages`, {content: newMessage, chatId: selectedChat._id}, {withCredentials: true})
            .then(response => {
                setNewMessage('');
                console.log('sendMessage', response.data)
                socket.current.emit('newMessage', response.data)
                setMessages([...messages, response.data])

            })
            .catch(err => console.log(err))
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)
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

    // const getSender = (currentUser, users) => {
    //     return users[0]._id === currentUser._id ? users[1].username : users[0].username
    // };

    console.log('selected Chat', selectedChat);
    console.log('chats', chats)

    useEffect(() => {
        if(currentUser) {
            fetchChats()
        }
    }, [currentUser])


    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat])

  

    const isSenderCurrentUser = (message) => {
        return (
          message.sender._id === currentUser._id
        )
    }

   

    const value = { accessChat, chats, setSelectedChat, selectedChat, messages, typingHandler, sendMessage, sendMessageOnKeyDown, isSenderCurrentUser}

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export default ChatContext;