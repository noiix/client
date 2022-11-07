import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { Link } from "react-router-dom"
import DesignContext from "../../../contexts/DesignContext"

const SuccessAlert = () => {
    const { notification, setNotification } = useContext(DesignContext)
    const [blendIn, setBlendIn] = useState(false)
    const [blendOut, setBlendOut] = useState(false)
    const [closeBtn, setCloseBtn] = useState(false)


    useEffect(() => {
        if (notification.length > 0) {
            setBlendIn(true)
            const timerFadeOut = setTimeout(() => {
                setBlendIn(false)
                setBlendOut(true)
            }, 7000)

            const timer = setTimeout(() => {
                let updatedNoteArr = notification.filter((note, index) => index !== 0)
                setBlendOut(false)
                setNotification(updatedNoteArr)
            }, 9000)
            return () => { clearTimeout(timer); clearTimeout(timerFadeOut) }
        }
    }, [notification])

    const closeNotification = (i) => {
        setCloseBtn(true)
        setBlendOut(true)
        const timerCloseNote = setTimeout(() => {
            setCloseBtn(false)
            setBlendOut(false)
            setNotification(notification.filter((note, index) => index !== i))
        }, 2000)
        return () => { clearTimeout(timerCloseNote) }
    }
    
    return (
        (notification.length > 0 &&
            notification.map((note, i) =>
                <div className={ `alert ${note.type} ${(blendOut && i === 0) || (blendOut && closeBtn && note[i]) && "fade-out"} ${(blendIn && i === (notification.length -1) && "fade-in")}` } key={i}>
                    <p>{ note.title } </p>
                    <Link onClick={ e => closeNotification(i) }><IoIosCloseCircleOutline /></Link>
                </div>)
        )
    )
}

export default SuccessAlert