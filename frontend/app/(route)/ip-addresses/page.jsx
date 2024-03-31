"use client"

import IpAddressTable from '@app/components/IpAddressTable'
import { UserContext } from '@app/lib/context';
import useRedirectIfAuthenticated from '@app/lib/useRedirectIfAuthenticated';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

const page = () => {

    const router = useRouter();
    const userContext = useContext(UserContext);
    useEffect(() => {
        if (!userContext.user.id) router.push("/")
    })

    return (
        <IpAddressTable />
    )
}

export default page