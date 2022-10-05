import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { Link } from "react-router-dom"
import DesignContext from "../../../contexts/DesignContext"

const SuccessAlert = () => {
    const { notification, setNotification } = useContext(DesignContext)
    const [blendIn, setBlendIn] = useState(false)
    const [closeBtn, setCloseBtn] = useState(false)


    useEffect(() => {
        if (notification.length > 0) {
            setBlendIn(true)
            const timerFadeOut = setTimeout(() => {
                setBlendIn(false)
            }, 7000)

            const timer = () => setTimeout(() => {
                setNotification(notification.filter((note, index) => index !== 0))
            }, 9000)
            return () => { clearTimeout(timer); clearTimeout(timerFadeOut) }
        }
    }, [notification])

    const closeNotification = (i) => {
        setCloseBtn(true)
        setBlendIn(false)
        const timerCloseNote = setTimeout(() => {
            setCloseBtn(false)
            setNotification(notification.filter((note, index) => index !== i))
        }, 800)
    }

    // console.log('notifications', notification)
    
    return (
        (notification.length > 0 &&
            notification.map((note, i) =>
                <div className={ `alert ${note.type} ${(!blendIn && i === 0) || (!blendIn && closeBtn && note[i]) ? "fade-out" : "fade-in"}` }>
                    <p>{ note.title } </p>
                    <Link onClick={ e => closeNotification(i) }><IoIosCloseCircleOutline /></Link>
                </div>)
        )
    )
}

export default SuccessAlert