import React, {createContext, useContext, useState} from 'react';
import UserContext from './UserContext';


const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const [currentChats, setCurrentChats] = useState([])
    const {currentUser} = useContext(UserContext)

    const value = {}

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export default ChatContext;