import GoogleAuth from './GoogleAuth';
import Login from './Login';
import Register from './Register'
import { useState, useContext } from 'react';
import UserContext from "../../contexts/UserContext";
import DesignContext from "../../contexts/DesignContext";
import Button from '../UI/button/Button';


const Authentication = () => {
    const { currentUser } = useContext(UserContext)
    const { toggleLoginOrRegister, toggleBtn, toggleLogin, logReg, darkMode, isDesktop } = useContext(DesignContext)


    return (
        <div className={ darkMode }>
            <div className='authentication'>

                { logReg ?
                    <Login />
                    :
                    <Register />
                }
                <div className='other-authentication'>
                    <div className='toggle'>
                        <Button onClick={ toggleLoginOrRegister } name={ logReg ? 'sign up' : 'back to log in' } />
                    </div>
                    <GoogleAuth /> 
                </div>


            </div>
        </div>
    )
}

export default Authentication;