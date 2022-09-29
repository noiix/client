import React, { createContext, useState } from "react";

const DesignContext = createContext();

export const DesignProvider = ({children}) => {
    //alert notifications
    const [notification, setNotification] = useState([])


    //light and dark mode
    const [darkMode, setDarkMode] = useState(false)


    const value = {notification, setNotification, darkMode, setDarkMode}

    return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
}

export default DesignContext;