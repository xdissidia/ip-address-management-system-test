import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useRedirectIfAuthenticated(userID, authToken, redirectIfAuthenticated = '/ip-addresses') {
    const router = useRouter();

    console.log(userID, authToken, redirectIfAuthenticated);
    useEffect(() => {
        if (userID && authToken) {
            router.push(redirectIfAuthenticated);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID, authToken, redirectIfAuthenticated]);
}