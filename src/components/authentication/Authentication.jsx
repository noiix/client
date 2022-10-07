import GoogleAuth from './GoogleAuth';
import Login from './Login';
import Register from './Register'
import { useState, useContext } from 'react';
import UserContext from "../../contexts/UserContext";
import DesignContext from "../../contexts/DesignContext";
import Button from '../UI/button/Button';


const Authentication = () => {
    const { currentUser } = useContext(UserContext)
    const { toggleLoginOrRegister, toggleBtn, toggleLogin, logReg } = useContext(DesignContext)


    return (

        <div className='authentication'>

        { logReg ?
        <Login />
        :
        <Register />
        }
        <div>
            <Button onClick={ toggleLoginOrRegister } name={ logReg ? 'or sign up' : 'back to log in' }/>
        </div>
        <p>or keep it simple and:</p>
        <GoogleAuth />
    

        </div>
    )
}

export default Authentication;