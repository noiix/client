import React, { createContext, useState, useEffect } from "react";

const DesignContext = createContext();

export const DesignProvider = ({children}) => {
      // media query
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const media = window.matchMedia('(min-width: 960px)');
        const listener = () => setIsDesktop(media.matches);
        listener();
        window.addEventListener('resize', listener);

        return () => window.removeEventListener('resize', listener);
    }, [isDesktop]);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 425px)');
        const listener = () => setIsMobile(media.matches);
        listener();
        window.addEventListener('resize', listener);

        return () => window.removeEventListener('resize', listener);
    }, [isMobile])


    //alert notifications
    const [notification, setNotification] = useState([])

    const addNewNotification = (note) => {
        // const includes = notification.some(({title}) => title === note.title)
        // console.log('includes:', includes)
        if(!notification.some(({title}) => title === note.title)){
            setNotification([...notification, note])
        }
    }


    //light and dark mode
    const [darkMode, setDarkMode] = useState('light')
    const [gMode , setGMode] = useState('outline')
    const toggleMode = () => {
        setDarkMode(darkMode === 'light' ? 'dark' : 'light')
        setGMode(gMode === 'outline' ? 'filled_black' : 'outline')
        console.log('MODE: ', darkMode)
    }
    useEffect(() => {
        if(localStorage.getItem('darkMode') === null) {
           setDarkMode('light')
        } else {
            setDarkMode(localStorage.getItem('darkMode'))
        }
        if(localStorage.getItem('gMode') === null) {
            setGMode('outline')
        } else {
            setGMode(localStorage.getItem('gMode'))
        }
    },[])
    
    useEffect(() => {
        localStorage.setItem('gMode', gMode)
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode, gMode])

    // nav toggle
    const [displayNav, setDisplayNav] = useState(false)
    const toggleNav = () => {
        setDisplayNav(!displayNav)
    }
    // console.log('notifications', notification)

    //Modals
    const [displayModal, setDisplayModal] = useState(false)
    const toggleModal = () => {
        setDisplayModal(!displayModal)
    }
    const closeModal = () => {
        setDisplayModal(false)
        setDisplayModalAdd(false)
        setDisplayModalUpdate(false)
        setDisplayNav(false)
    }

    const [displayModalUpdate, setDisplayModalUpdate] = useState(false)
    
    const toggleModalUpdate = () => {
        setDisplayModalUpdate(!displayModalUpdate)
    }

    const [displayModalAdd, setDisplayModalAdd] = useState(false)
    const toggleModalAdd = () => {
        setDisplayModalAdd(!displayModalAdd)
    }

    const [waitingAnimation, setWaitingAnimation] = useState(false)

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

    const value = {notification, setNotification, addNewNotification, darkMode, gMode, toggleMode, displayNav, toggleNav, isDesktop, isMobile,  toggleModal, closeModal, displayModal, toggleLogin, toggleLoginOrRegister, logReg, toggleModalUpdate, displayModalUpdate, toggleModalAdd, displayModalAdd, displayForm, setDisplayForm, toggleForm, waitingAnimation, setWaitingAnimation}

    return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
}

export default DesignContext;