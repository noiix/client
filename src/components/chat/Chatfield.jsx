import React, {useContext} from 'react'
import ChatContext from '../../contexts/ChatContext'
import UserContext from '../../contexts/UserContext'
import Button from '../UI/button/Button'


function Chatfield() {

    const {currentUser} = useContext(UserContext);
    const {chats, setSelectedChat, selectedChat, messages, typingHandler, sendMessage, sendMessageOnKeyDown} = useContext(ChatContext);

  return (
    <div className="chat-window-right">
    {selectedChat && 
      <>
      {messages &&
        messages.map(msg => {
          <>
          <div className="current-chat-message-own">
              Your message Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure velit quisquam non blanditiis quidem natus placeat eveniet. Vitae, officiis quibusdam.
          </div>
          <div className="current-chat-message-partner">
              Your chat partner's message Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur assumenda quia quis corporis impedit mollitia, quidem quo quae asperiores minima autem modi illo ad? Suscipit ut vero ea numquam eius?
          </div>
        </>
          })
        }
      </>
      }
      
      <form className="current-chat-input">
          <input type='text' name='message' placeholder='write something' onChange={typingHandler} onKeyDown={sendMessageOnKeyDown}/>
          <Button type='submit' name='SEND' onClick={sendMessage}/>
      </form>
    </div>
  )
}

export default Chatfield