import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import UserContext from "../../../contexts/UserContext"

const SuccessAlert = ({title, type}) => {
    const {notification} = useContext(UserContext)
    const [blendIn, setBlendIn] = useState(false)

    useEffect(()=> {
        const timer = setTimeout(() => {

        }, 10000)
        return () => clearTimeout(timer)
    }, [notification])

    return (
        <div className={`alert ${type}`}>
            <p>{title}</p>
        </div>
    )
}

export default SuccessAlert