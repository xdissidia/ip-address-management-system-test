'use client'

import React, { useContext, useEffect, useState } from 'react'
import UpdateLabelButton from './UpdateLabelButton'
import CreateIPAddressButton from './CreateIPAddressButton'
import { UserContext } from '@app/lib/context'
import createAxios from '@app/lib/axios'

const IpAddressTable = () => {

    const userContext = useContext(UserContext);
    const axios = createAxios(userContext ? userContext.authToken : '');
    const [ipAddresses, setIpAddresses] = useState([]);

    useEffect(() => {
        fetchIpAddresses()
    }, []);

    function fetchIpAddresses() {
        axios.get('/api/v1/ip-addresses')
            .then(res => {
                if (res.data) {
                    console.log(res.data.data);
                    setIpAddresses(res.data.data)
                }
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }


    return (
        <section className='w-full'>

            <CreateIPAddressButton />
            <br />
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead
                                    className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">#</th>
                                        <th scope="col" className="px-6 py-4">IP Address</th>
                                        <th scope="col" className="px-6 py-4">Label</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ipAddresses && ipAddresses.map((item, i) => (

                                        <tr key={i}
                                            className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.ip_address}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.label}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <UpdateLabelButton
                                                    title='Update Label'
                                                    item={item}
                                                />
                                            </td>
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

export default IpAddressTable