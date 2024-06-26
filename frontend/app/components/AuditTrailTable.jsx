'use client'

import createAxios from '@app/lib/axios';
import { UserContext } from '@app/lib/context';
import React, { useContext, useEffect, useState } from 'react'

const AuditTrailTable = () => {

    const userContext = useContext(UserContext);
    const axios = createAxios(userContext ? userContext.authToken : '');
    const [auditTrails, setAuditTrails] = useState([]);

    useEffect(() => {
        fetchAuditTrails()
    }, []);

    const fetchAuditTrails = async (event) => {
        axios.get('/api/v1/audit-trails')
            .then(res => {
                if (res.data) {
                    setAuditTrails(res.data.data)
                }
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }


    return (
        <section className='w-full'>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead
                                    className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Date</th>
                                        <th scope="col" className="px-6 py-4">IP Address</th>
                                        <th scope="col" className="px-6 py-4">Username</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                        <th scope="col" className="px-6 py-4">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {auditTrails && auditTrails.map((item, i) => (
                                        <tr key={i}
                                            className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{item.created_at}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.ip_address}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.user ? item.user.name : null}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.action}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuditTrailTable