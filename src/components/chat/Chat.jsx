import React, { useContext, useEffect, useState } from 'react'
import ChatContext from '../../contexts/ChatContext'
import UserContext from '../../contexts/UserContext'
import DesignContext from '../../contexts/DesignContext'
import Button from '../UI/button/Button'
import Chatfield from './Chatfield'
import {Link} from 'react-router-dom'

function Chat() {

    const { currentUser } = useContext(UserContext);
    const { chats, setSelectedChat, selectedChat, messages, accessChat, isSenderCurrentUser, chatNotification, setChatNotification } = useContext(ChatContext);
    const { isDesktop } = useContext(DesignContext);
    const [displayChat, setDisplayChat] = useState(false);

    const toggleDisplayChat = () => {
        setDisplayChat(!displayChat);
    }

    useEffect(() => {
        if (selectedChat === '') {
            setDisplayChat(false)
        }
    }, [selectedChat])


    // console.log('chats', chats)

    return (
        <div className="chat-main">
            <div className='chat-container'>

                <div className='chat-list-left'>
                    { chats && chats.map((chat, i) => <> {
                        chat.users.map(user => user._id !== currentUser._id &&
                            (<div key={ user._id } className="chat-partner-row icon" onClick={ () => { setSelectedChat(chat); accessChat(user._id); toggleDisplayChat(); setChatNotification(chatNotification.filter((n, i) => n.chat === chat)) } }>
                                <div className="chat-profile-img">
                                    <img src={ user.image } />
                                </div>
                                <div className="chat-text-box">
                                    <div className="chat-partner-name">
                                        {user.username}
                                        {chatNotification.filter(n => n.chat._id === chat._id).length > 0 && <span className='dot'></span>}
                                    </div>
                                    <div className="chat-text-teaser">
                                        <span>something</span>
                                    </div>
                                </div>
                            </div>))
                    }</>) }
                </div>
                <div className={ `${displayChat ? 'overlay' : 'overlay-hidden'}` }> { !isDesktop &&
                    <Button type='back-to-chat-partners-btn icon' name="back" onClick={ () => { setSelectedChat(""); toggleDisplayChat() } }>
                        Back 
                    </Button> }
                    <Chatfield />
                </div>
            </div>
        </div>
    )
}

export default Chat