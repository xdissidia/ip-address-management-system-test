import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useRedirectIfAuthenticated(userID, authToken, redirectIfAuthenticated = '/ip-addresses') {
    
    const router = useRouter();

    useEffect(() => {
        if (userID && authToken) {
            router.push(redirectIfAuthenticated);
        }else{
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID, authToken, redirectIfAuthenticated]);
}