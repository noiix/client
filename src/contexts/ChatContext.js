import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import baseUrl from "../config";
import {useNavigate} from 'react-router-dom'
import DesignContext from "../contexts/DesignContext";
import UserContext from "../contexts/UserContext";
import io from 'socket.io-client';


// const socket = io(baseUrl, { transports: ["websocket", "polling"] });

const ChatContext = createContext();

export const ChatProvider = ({children}) => {

    const API = axios.create({ baseUrl: baseUrl });

    const {currentUser} = useContext(UserContext);
    const {notification, setNotification} = useContext(DesignContext);

    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState({})
    const [fetchAgain, setFetchAgain] = useState(false)

    const fetchChats = () => {
        API.get(`${baseUrl}/chat`, { withCredentials: true})
        .then(response => {
            if(response.data) {
                setChats(response.data)
            }
            setNotification([...notification, response.notification])
           
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

    console.log('selected Chat', selectedChat);
    console.log('chats', chats)

    useEffect(() => {
        if(currentUser) {
            fetchChats()
        }
    }, [fetchAgain])

    // const [isConnected, setIsConnected] = useState(socket.connected);
    // const [lastPong, setLastPong] = useState(null);
    // const [currentChat, setCurrentChat] = useState([]);
  



    // useEffect(() => {
    //     socket.on('connect', () => {
    //       setIsConnected(true);
    //       console.log("it's connected")
    //     });
    
    //     socket.on('disconnect', () => {
    //       setIsConnected(false);
    //     });
    
    //     socket.on('pong', () => {
    //       setLastPong(new Date().toISOString());
    //     });
    
    //     return () => {
    //       socket.off('connect');
    //       socket.off('disconnect');
    //       socket.off('pong');
    //     };
    //   }, []);

    //   const sendPing = () => {
    //     socket.emit('ping');
    //   }

    //   const addMessageToConversation = ({recipient, content, sender}) => {
        
    //   }

    //   const sendMessage = (recipientId, content) => {
    //     addMessageToConversation({recipientId, content, sender: currentUser._id})
    //   }

    const value = { accessChat  }

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export default ChatContext;