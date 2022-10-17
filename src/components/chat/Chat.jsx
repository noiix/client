import React from 'react';
import ChatContext from '../../contexts/ChatContext';
import UserContext from '../../contexts/UserContext';

function Chat() {

  const send = (e) => {
    if(e.key === "Enter"){
      console.log(e.target.value)
    }
  }


  return (
    <div className="chat-main">
        <div className='chat-header'>Chat</div>
    <div className='chat-container'>
        
      <div className='chat-list-left'>
        <div className="chat-partner-row">
            <div className="chat-profile-img">
                <div className="picture"></div>
            </div>
            <div className="chat-text-box">
                <div className="chat-partner-name">
                    Name
                </div>
                <div className="chat-text-teaser">
                    Hey, this is the first line of the chat, the rest of it is hidden. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, itaque.
                </div>
            </div>
        </div>
      </div>
        <div className="back-to-chat-partners-btn">
            Back
        </div>
      <div className="chat-window-right">

        <div className="current-chat-message-own">
            Your message Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure velit quisquam non blanditiis quidem natus placeat eveniet. Vitae, officiis quibusdam.
        </div>
        <div className="current-chat-message-partner">
            Your chat partner's message Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur assumenda quia quis corporis impedit mollitia, quidem quo quae asperiores minima autem modi illo ad? Suscipit ut vero ea numquam eius?
        </div>
        <div className="current-chat-input">
            Input Field Lorem ipsum dolor, sit amet conse ctetur adipi sicing elit. Animi quis dolore mque eligendi iure consectetur pariatur sequi amet cum, quae nulla et aspernatur tempore?
        </div>
      </div>
    </div>
    </div>
  )
}

export default Chat