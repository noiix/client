import GoogleAuth from './GoogleAuth';
import Login from './Login';
import Register from './Register'
import { useState, useContext } from 'react';
import UserContext from "../../contexts/UserContext";
import DesignContext from "../../contexts/DesignContext";
import Button from '../UI/button/Button';


const Authentication = () => {
    const { currentUser } = useContext(UserContext)
    const { toggleLoginOrRegister, toggleBtn, toggleLogin, logReg, darkMode } = useContext(DesignContext)


    return (
        <div className={ darkMode }>
            <div className='authentication'>

                { logReg ?
                    <Login />
                    :
                    <Register />
                }
                <div className='toggle'>
                    <Button onClick={ toggleLoginOrRegister } name={ logReg ? 'sign up' : 'back to log in' } />
                </div>
                <p>or keep it simple and:</p>
                <GoogleAuth />


            </div>
        </div>
    )
}

export default Authentication;