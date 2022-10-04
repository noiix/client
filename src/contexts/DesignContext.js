import React, { createContext, useState } from "react";

const DesignContext = createContext();

export const DesignProvider = ({children}) => {
    //alert notifications
    const [notification, setNotification] = useState([])


    //light and dark mode
    const [darkMode, setDarkMode] = useState(false)
    const toggleMode = () => {
        setDarkMode(!darkMode)
    }

    // nav toggle
    const [visibilityNav, setVisibilityNav] = useState(false)
    const toggleNav = () => {
        setVisibilityNav(!visibilityNav)
    }

    const value = {notification, setNotification, darkMode, toggleMode, visibilityNav, setVisibilityNav, toggleNav}

    return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
}

export default DesignContext;