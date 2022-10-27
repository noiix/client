import React, {useContext, useRef, useState, useEffect} from 'react'
import ChatContext from '../../contexts/ChatContext'
import UserContext from '../../contexts/UserContext'
import Button from '../UI/button/Button'


function Chatfield() {

    const scrollViewRef = useRef();
    const {currentUser} = useContext(UserContext);
    const {chats, setSelectedChat, selectedChat, messages, typingHandler, sendMessage, sendMessageOnKeyDown, isSenderCurrentUser, isTyping} = useContext(ChatContext);
  //   const [scrollBottom, setScrollBottom] = useState(false);

  //   useEffect(() => {
  //     setScrollBottom(true)
  // }, [messages])
    
  return (
    <div className="chat-window-right">
    {selectedChat && 
        <div className='chat-scroll'  ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
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
            {selectedChat && (isTyping === selectedChat._id && <div>Typing...</div>)}
          <input type='text' name='message' placeholder='write something' onChange={typingHandler} onKeyDown={sendMessageOnKeyDown}/>
          <Button type='send' name='SEND' onClick={sendMessage}/>
      </form>
    </div>
  )
}

export default Chatfield