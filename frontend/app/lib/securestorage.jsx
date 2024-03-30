import secureLocalStorage from 'react-secure-storage';
import { decryptSessionData } from './cryptosession';

export const getSecureStorage = (key, datatype = 'object') => {
    const secureStorage = secureLocalStorage.getItem(key);
    if (secureStorage) {
        return secureStorage;
    }
    return decryptSessionData(key, datatype);
}    