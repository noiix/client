import React, {useContext, useRef, useState, useEffect} from 'react'
import ChatContext from '../../contexts/ChatContext'
import UserContext from '../../contexts/UserContext'
import Button from '../UI/button/Button'


function Chatfield() {

    const scrollViewRef = useRef();
    const {currentUser} = useContext(UserContext);
    const {chats, setSelectedChat, firstMessage, selectedChat, messages, typingHandler, sendMessage, sendMessageOnKeyDown, isSenderCurrentUser, isTyping, newMessage} = useContext(ChatContext);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
      scrollToBottom()
    }, [messages]);

  
    
  return (
    <div className="chat-window-right">

    {selectedChat && 
      <>
        <div className='chat-scroll'  ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        {messages ?
          messages.map((msg, index) => 
            <>
            <div className={isSenderCurrentUser(msg) ? "current-chat-message-own" : "current-chat-message-partner"} key={index}>
              {msg.content}
            </div>
            <div ref={messagesEndRef}></div>
          </>) :
          firstMessage.map((msg,index) => 
            <>
              <div className={isSenderCurrentUser(msg) ? "current-chat-message-own" : "current-chat-message-partner"} key={index}>
                {msg.content}
              </div>
              <div ref={messagesEndRef}></div>
            </>
          )
          }
        </div> 
        
        <form className="current-chat-input">
            {selectedChat && (isTyping === selectedChat._id && <div>Typing...</div>)}
          <input type='text' name='message' placeholder='write something' value={newMessage} onChange={typingHandler} onKeyDown={sendMessageOnKeyDown}/>
          <Button type='send' name='SEND' onClick={sendMessage}/>
        </form>
      </>
      }
      
    </div>
  )
}

export default Chatfield