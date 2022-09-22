import React, {createContext} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const value= {}

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContext;