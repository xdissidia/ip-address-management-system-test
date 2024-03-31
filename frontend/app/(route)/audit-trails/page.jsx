"use client"

import AuditTrailTable from '@app/components/AuditTrailTable'
import { UserContext } from '@app/lib/context';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

const page = () => {

    const router = useRouter();
    const userContext = useContext(UserContext);
    useEffect(() => {
        if (!userContext.user.id) router.push("/")
    })

    return (
        <AuditTrailTable />
    )
}

export default page