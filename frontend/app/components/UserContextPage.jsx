'use client'

import { useState } from 'react';
import { UserContext } from '@app/lib/context';
import { getSecureStorage } from '@app/lib/securestorage';

const UserContextPage = ({ children }) => {
    const secureStorage = getSecureStorage('user_data');
    const [user, setUser] = useState(secureStorage ? secureStorage.user : {});
    const [authToken, setAuthToken] = useState(secureStorage ? secureStorage.authorization.token : '');

    const userlLogin = (userResponse) => {
        if (userResponse) {
            setUser(userResponse.user);
            setAuthToken(userResponse.authorization?.token);
        }
    };

    const userlLogout = () => {
        setUser({});
        setAuthToken('');
    }

    const userContext = {
        user: user,
        authToken: authToken,
        userlLogin: userlLogin,
        userlLogout: userlLogout
    };

    return (
        <UserContext.Provider value={userContext}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextPage;