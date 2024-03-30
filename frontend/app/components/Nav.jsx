'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React from 'react'

const Nav = () => {

    const isLoggedIn = true;

    const router = useRouter();

    const logout = async event => {

        router.push('/')
    }

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <div>
                {isLoggedIn && (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/ip-addresses" className='flex gap-2 flex-center'>
                            IP Address
                        </Link>
                        <Link href="/audit-trails" className='flex gap-2 flex-center'>
                            Audit Trails
                        </Link>
                    </div>
                )}
            </div>
            <div className='sm:flex hidden'>
                {isLoggedIn && (
                    <div className='flex gap-3 md:gap-5'>
                        <button type='button' onClick={logout} className='outline_btn'>Sign Out</button>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Nav