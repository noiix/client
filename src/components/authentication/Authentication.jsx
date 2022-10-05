import GoogleAuth from './GoogleAuth';
import Login from './Login';
import Register from './Register'
import { useState, useContext } from 'react';
import UserContext from "../../contexts/UserContext";
import DesignContext from "../../contexts/DesignContext";
import Button from '../UI/button/Button';


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
                { !toggleBtn && <button onClick={ toggleLogin }>login</button> }
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
                        <Button onClick={ toggleLoginOrRegister } name={ logReg ? 'or sign up' : 'back to log in' }/>
                        <p>or keep it simple and:</p>
                        <GoogleAuth />
                    </> : <></>
                }
            </> }

        </div>
    )
}

export default Authentication;