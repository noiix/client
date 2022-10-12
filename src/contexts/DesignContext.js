import React, { createContext, useState, useEffect } from "react";

const DesignContext = createContext();

export const DesignProvider = ({children}) => {
      // media query
    const [isDesktop, setIsDesktop] = useState(false);
    
    useEffect(() => {
        const media = window.matchMedia('(min-width: 960px)');
        const listener = () => setIsDesktop(media.matches);
        listener();
        window.addEventListener('resize', listener);

        return () => window.removeEventListener('resize', listener);
    }, [isDesktop]);


    //alert notifications
    const [notification, setNotification] = useState([])


    //light and dark mode
    const [darkMode, setDarkMode] = useState(false)
    const toggleMode = () => {
        setDarkMode(!darkMode)
    }

    // nav toggle
    const [displayNav, setDisplayNav] = useState(false)
    const toggleNav = () => {
        setDisplayNav(!displayNav)
    }
    console.log('notifications', notification)

    //Modals
    const [displayModal, setDisplayModal] = useState(false)
    const toggleModal = () => {
        setDisplayModal(!displayModal)
    }
    const closeModal = () => {
        setDisplayModal(false)
        setDisplayModalAdd(false)
        setDisplayModalUpdate(false)
    }

    const [displayModalUpdate, setDisplayModalUpdate] = useState(false)
    
    const toggleModalUpdate = () => {
        setDisplayModalUpdate(!displayModalUpdate)
    }

    const [displayModalAdd, setDisplayModalAdd] = useState(false)
    const toggleModalAdd = () => {
        setDisplayModalAdd(!displayModalAdd)
    }

    //authentication
    const [toggleBtn, setToggleBtn] = useState(false)
    function toggleLogin() {
        setToggleBtn(!toggleBtn)
    }
    const [logReg, setLogReg] = useState(true)
    function toggleLoginOrRegister() {
        setLogReg(!logReg)
    }

    const [displayForm, setDisplayForm] = useState(false)
    const toggleForm = () => {
      setDisplayForm(!displayForm)
    }

    const value = {notification, setNotification, darkMode, toggleMode, displayNav, toggleNav, isDesktop, toggleModal, closeModal, displayModal, toggleLogin, toggleLoginOrRegister, logReg, toggleModalUpdate, displayModalUpdate, toggleModalAdd, displayModalAdd, closeModal, displayForm, setDisplayForm, toggleForm}

    return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
}

export default DesignContext;