import React, {createContext} from 'react';


const ChatContext = createContext();

export const ChatProvider = ({children}) => {

    const value = {}

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export default ChatContext;