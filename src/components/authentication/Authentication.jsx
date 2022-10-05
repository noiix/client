import GoogleAuth from './GoogleAuth';
import Login from './Login';
import Register from './Register'
import { useState, useContext } from 'react';
import UserContext from "../../contexts/UserContext";


const Authentication = () => {
    const { currentUser } = useContext(UserContext)

    const [toggleBtn, setToggleBtn] = useState(false)
    function toggleLogin() {
        setToggleBtn(!toggleBtn)
    }
    const [logReg, setLogReg] = useState(true)
    function toggleLoginOrRegister() {
        setLogReg(!logReg)
    }

    return (

        <div className='authentication'>
            { Object.keys(currentUser).length !== 0 ? <></> : <>
                <button onClick={ toggleLogin }>login</button>
                { toggleBtn ?
                    <>
                        { logReg ?
                            <>
                                <Login />
                            </>
                            :
                            <>
                                <Register />
                            </> }
                        <button onClick={ toggleLoginOrRegister }>{ logReg ? 'or sign up' : 'back to log in' }</button>
                        <h4>or keep it simple and:</h4>
                        <GoogleAuth />
                    </> : <></>
                }
            </> }

        </div>
    )
}

export default Authentication;