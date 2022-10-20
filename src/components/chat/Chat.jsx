import React, {useContext} from 'react'
import ChatContext from '../../contexts/ChatContext'
import UserContext from '../../contexts/UserContext'
import Button from '../UI/button/Button'
import Chatfield from './Chatfield'

function Chat() {

    const {currentUser} = useContext(UserContext);
    const {chats, setSelectedChat, selectedChat, messages, accessChat, isSenderCurrentUser, chatNotification} = useContext(ChatContext);


    console.log('chats', chats)

  return (
    <div className="chat-main">
        <div className='chat-header'>Chat</div>
    <div className='chat-container'>
        
     <div className='chat-list-left'>
        {chats && chats.map(chat =>  <> {
            chat.users.map(user => user._id !== currentUser._id &&
                (<div className="chat-partner-row" onClick={() => {setSelectedChat(chat); accessChat(user._id)}}>
                <div className="chat-profile-img">
                    <img src={user.image}/>
                </div>
                <div className="chat-text-box">
                    <div className="chat-partner-name">
                        {user.username}
                    </div>
                    <div className="chat-text-teaser">
                       <span>something</span>
                    </div>
                </div>
            </div>)) 
            }</>)}
      </div>
        <div className="back-to-chat-partners-btn">
            Back
        </div>
        <Chatfield/>
    </div>
    </div>
  )
} 

export default Chat