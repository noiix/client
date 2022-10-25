import React, {useContext, useState, useEffect} from 'react'
import ChatContext from '../../contexts/ChatContext'
import UserContext from '../../contexts/UserContext'
import Button from '../UI/button/Button'
import Chatfield from './Chatfield'

function Chat() {

    const {currentUser} = useContext(UserContext);
    const [read, setRead] = useState([])
    const {chats, setSelectedChat, selectedChat, messages, accessChat, isSenderCurrentUser, chatNotification, setMessageToRead, setChatNotification} = useContext(ChatContext);

    // useEffect(() => {
    //     const unreadMessages = messages.filter(msg => msg.read === false);
    //     setRead(unreadMessages)
    // }, [messages])

    // let counter = 0;

    // console.log(read)
  


    // console.log('chats', chats)
    // const message = messages.filter(msg => msg.chat._id === selectedChat._id && msg.read === false) 
    // console.log('message to read', message)
    const displayUnreadMsgNum = (chat) => {
        let counter = 0;
        messages && messages.forEach(msg => chat._id === msg.chat._id && msg.read === false && msg.sender._id !== currentUser._id ? counter++ : counter)
        return counter
    }

 

  return (
    <div className="chat-main">
    <div className='chat-container'>
        
     <div className='chat-list-left'>
        {chats && chats.map(chat =>  <> {
            chat.users.map(user => user._id !== currentUser._id &&
                (<div className="chat-partner-row" onClick={() => {setSelectedChat(chat); accessChat(user._id); setChatNotification(chatNotification.filter((n, i) => n.chat === chat)); setMessageToRead()}}>
                <div className="chat-profile-img">
                    <img src={user.image}/>
                </div>
                <span>{displayUnreadMsgNum(chat) > 0 && displayUnreadMsgNum(chat)}</span>
                <div className="chat-text-box">
                    <div className="chat-partner-name">
                        {user.username}
                        {chatNotification.filter(n => n.chat._id === chat._id).length > 0 && <span className='dot'></span>}
                    </div>
                    <div className="chat-text-teaser">
                       <span>something</span>
                    </div>
                </div>
            </div>)) 
            }</>)}
      </div>
        <div className="back-to-chat-partners-btn" onClick={() => setSelectedChat("")}>
            Back
        </div>
        <Chatfield/>
    </div>
    </div>
  )
} 

export default Chat