import React, {useContext} from 'react'
import ChatContext from '../../contexts/ChatContext'
import UserContext from '../../contexts/UserContext'
import Button from '../UI/button/Button'
import Chatfield from './Chatfield'

function Chat() {

    const {currentUser} = useContext(UserContext);
    const {chats, setSelectedChat, selectedChat, messages, accessChat} = useContext(ChatContext);


    console.log('chats', chats)

    // console.log('users', users)


//   const send = (e) => {
//     e.preventDefault();
//     if(e.key === "Enter"){
//       console.log(e.target.value)
//       const content = e.target.value
//       const recipientId = currentChat.filter(id =>  id !== currentUser._id);
//     //   sendMessage(recipientId, content)
//     }
//   }


  return (

  <div className="chat-main">
    <div className='chat-header'>
      Chat
    </div>

    <div className='chat-container'>
<<<<<<< HEAD
      <div className='chat-list-left'>
        <div className="chat-partner-row">
            <div className="chat-profile-img">
                <div className="picture"></div>
            </div>
            <div className="chat-text-box">
                <div className="chat-partner-name">
                    Name
=======
        
     <div className='chat-list-left'>
        {chats && chats.map(chat =>  <> {
            chat.users.map(user => user._id !== currentUser._id &&
                (<div className="chat-partner-row" onClick={() => {setSelectedChat(chat); accessChat(user._id)}}>
                <div className="chat-profile-img">
                    <img src={user.image}/>
>>>>>>> 124ff873f891dc96dfa7802b08f6d83adfb0a3dd
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