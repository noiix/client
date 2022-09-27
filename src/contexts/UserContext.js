import React, {createContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {

    //alert notifications
    const [notification, setNotification] = useState(null)

    const value= {notification, setNotification}

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContext;