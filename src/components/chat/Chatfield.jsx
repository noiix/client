import React, {useContext} from 'react'
import ChatContext from '../../contexts/ChatContext'
import UserContext from '../../contexts/UserContext'
import Button from '../UI/button/Button'


function Chatfield() {

    const {currentUser} = useContext(UserContext);
    const {chats, setSelectedChat, selectedChat, messages, typingHandler, sendMessage, sendMessageOnKeyDown, isSenderCurrentUser} = useContext(ChatContext);
    
  return (
    <div className="chat-window-right">
    {selectedChat && 
        <div className='chat-scroll'>
        {messages &&
          messages.map((msg, index) => 
            <>
            <div className={isSenderCurrentUser(msg) ? "current-chat-message-own" : "current-chat-message-partner"} key={index}>
              {msg.content}
            </div>
          </>)
          }
        </div>
        }
      
      <form className="current-chat-input">
          <input type='text' name='message' placeholder='write something' onChange={typingHandler} onKeyDown={sendMessageOnKeyDown}/>
          <Button type='submit' name='SEND' onClick={sendMessage}/>
      </form>
    </div>
  )
}

export default Chatfield