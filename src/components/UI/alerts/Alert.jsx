import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { Link } from "react-router-dom"
import DesignContext from "../../../contexts/DesignContext"

const SuccessAlert = () => {
    const {notification} = useContext(DesignContext)
    const [blendIn, setBlendIn] = useState(true)
    const [displayNote, setDisplayNote] = useState(false)

    useEffect(()=> {
        if(notification){
            setDisplayNote(true)
            setBlendIn(true)
        }
        const timerFadeOut = setTimeout(() => {
            setBlendIn(false)
        }, 9000)
        const timer = setTimeout(() => {
            setDisplayNote(false)
            notification.shift()
        }, 11000)
        return () => { clearTimeout(timer); clearTimeout(timerFadeOut) }
    }, [notification])

    const closeNotification = () => {
        setBlendIn(false)
        const timerCloseNote = (() => {setDisplayNote(false)
        notification.shift()}, 200)
        return () => { clearTimeout(timerCloseNote)}
    }
    
    return (
        (displayNote && 
        notification.map((note, i) => 
            <div className={`alert ${note.type} ${blendIn ? "fade-in" : "fade-out"}`} onAnimationEnd={() => {setBlendIn(false)}}>
                <p>{note.title} </p>
                <Link onClick={closeNotification}><IoIosCloseCircleOutline/></Link>
            </div>)
        )
    )
}

export default SuccessAlert