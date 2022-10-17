import React, {useContext} from 'react'
import ChatContext from '../../contexts/ChatContext'
import UserContext from '../../contexts/UserContext'
import Button from '../UI/button/Button'

function Chat() {

    const {currentUser, contacts, users} = useContext(UserContext);
    const {currentChat, setCurrentChat} = useContext(ChatContext);


    console.log('user contacts', currentUser.contacts)
    console.log('contacts', contacts)

    console.log('users', users)


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
    <div className="chat-main">
        <div className='chat-header'>Chat</div>
    <div className='chat-container'>
        
     <div className='chat-list-left'>
        {users && users.map(user =>  <> {
            currentUser.contacts.includes(user._id) &&
                (<div className="chat-partner-row">
                <div className="chat-profile-img">
                    <div className="picture"><img src={user.image}/></div>
                </div>
                <div className="chat-text-box">
                    <div className="chat-partner-name">
                        {user.username}
                    </div>
                    <div className="chat-text-teaser">
                       <span>something</span>
                    </div>
                </div>
            </div>)
        
            }</>)}
      </div>
        <div className="back-to-chat-partners-btn">
            Back
        </div>
      <div className="chat-window-right">

        <div className="current-chat-message-own">
           
        </div>
        <div className="current-chat-message-partner">
            
        </div>
        <div className="current-chat-input">
            <input type='text' name='message' placeholder='write something'/>
            <Button type='submit' name='SEND' onClick={() => {}}></Button>
        </div>
      </div>
    </div>
    </div>
  )
} 

export default Chat