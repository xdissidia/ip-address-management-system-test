'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import UserContextPage from './UserContextPage';
import { UserContext } from '@app/lib/context';
import createAxios from '@app/lib/axios';
import secureLocalStorage from 'react-secure-storage';

const Nav = () => {

    const userContext = useContext(UserContext);
    const axios = createAxios(userContext ? userContext.authToken : '');

    const isLoggedIn = true;

    console.log(userContext.user)

    const router = useRouter();

    const logout = async () => {
        await axios
            .post('/logout')
            .then(res => {
                if (res.data) {
                    secureLocalStorage.clear();
                    sessionStorage.clear();
                    userContext.userlLogout();
                }
            })
            .catch(error => {
                throw error;
            });
        window.location.pathname = '/';

    };


    return (
        <>
            {
                userContext.user.id && (
                    <nav className='flex-between w-full mb-16 pt-3'>
                        <div>
                            <div className='flex gap-3 md:gap-5'>
                                <Link href="/ip-addresses" className='flex gap-2 flex-center'>
                                    IP Address
                                </Link>
                                <Link href="/audit-trails" className='flex gap-2 flex-center'>
                                    Audit Trails
                                </Link>
                            </div>
                        </div>
                        <div className='sm:flex hidden'>
                            <div className='flex gap-3 md:gap-5'>
                                <button type='button' onClick={logout} className='outline_btn'>Sign Out</button>
                            </div>
                        </div>
                    </nav>
                )
            }
        </>
    )
}

export default Nav