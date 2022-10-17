import React from 'react'
import ChatContext from '../../contexts/ChatContext'

function Chat() {

  const send = (e) => {
    if(e.key === "Enter"){
      console.log(e.target.value)
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