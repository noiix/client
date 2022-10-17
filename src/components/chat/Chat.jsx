import React, {useContext} from 'react'
import ChatContext from '../../contexts/ChatContext'
import UserContext from '../../contexts/UserContext'

function Chat() {

    const {currentUser} = useContext(UserContext);
    const {currentChat, setCurrentChat} = useContext(ChatContext);


  const send = (e) => {
    e.preventDefault();
    if(e.key === "Enter"){
      console.log(e.target.value)
      const content = e.target.value
      const recipientId = currentChat.filter(id =>  id !== currentUser._id);
    //   sendMessage(recipientId, content)
    }
  }

  return (
    <div className='chat-container'>
      <div className='chat'>
        <div id='messages'></div>
        <div>
          <input type='text' onKeyUp={(e) => send(e)} id='message' placeholder='your message...'/>
        </div>
      </div>
    </div>
  )
}

export default Chat