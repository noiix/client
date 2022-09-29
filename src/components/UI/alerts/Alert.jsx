import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import {IoIosCloseCircleOutline} from 'react-icons/io'
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
        const timer = setTimeout(() => {
            setDisplayNote(false)
            notification.shift()
        }, 11000)
        return () => { clearTimeout(timer) }
    }, [notification])

    console.log(notification)

    return (
        (displayNote && 
            notification.map((note, i) => 
                <div className={`alert ${note.type} ${'note-'+i} ${blendIn ? "fade-in" : "fade-out"}`} onAnimationEnd={() => {setBlendIn(false)}}>
                    <p>{note.title} {IoIosCloseCircleOutline}</p>
                </div>)
            )
    )
}

export default SuccessAlert