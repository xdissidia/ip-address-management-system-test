'use client'

import createAxios from '@app/lib/axios';
import { UserContext } from '@app/lib/context';
import { encryptSessionData } from '@app/lib/cryptosession';
import useRedirectIfAuthenticated from '@app/lib/useRedirectIfAuthenticated';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react'
import { TEInput, TERipple } from 'tw-elements-react'
import InputError from './InputError';

const LoginForm = () => {

    const userContext = useContext(UserContext);
    const router = useRouter();
    const axios = createAxios(userContext ? userContext.authToken : '');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRemember, setShouldRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const csrf = () => axios.get('/sanctum/csrf-cookie');

    useRedirectIfAuthenticated(userContext.user.id, userContext.authToken, '/ip-addresses');

    const submitForm = async (event) => {
        event.preventDefault();

        await csrf();

        setErrors({});
        setStatus(null);

        axios
            .post('/login', {
                email,
                password,
                remember: shouldRemember,
            })
            .then(res => {
                if (res.data) {
                    encryptSessionData('user_data', res.data);
                    userContext.userlLogin(res.data);
                    router.push('/ip-addresses')
                }
            })
            .catch(error => {
                console.log(error)
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    return (
        <section className="h-full">
            <div className="container h-full p-10">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                {/* <!-- Left column container--> */}
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        {/* <!--Logo--> */}
                                        <div className="text-center">
                                            <img
                                                className="mx-auto w-48"
                                                src="/assets/images/ipams.png"
                                                alt="logo"
                                            />
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                                IP Address Management System
                                            </h4>
                                        </div>

                                        <form onSubmit={submitForm}>
                                            <p className="mb-4">Please login to your account</p>
											<InputError messages={errors.email} className="mt-2" />
                                            {/* <!--Username input--> */}
                                            <TEInput
                                                id="email"
                                                type="email"
                                                value={email}
                                                className="mb-4"
                                                onChange={event => setEmail(event.target.value)}
                                                required
                                                autoFocus
                                            ></TEInput>
                                            {/* <!--Password input--> */}
                                            <TEInput
                                                id="password"
                                                type="password"
                                                value={password}
                                                className="mb-4"
                                                onChange={event => setPassword(event.target.value)}
                                                required
                                                autoComplete="current-password"
                                            ></TEInput>
                                            
                                            {/* <!--Submit button--> */}
                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <TERipple rippleColor="light" className="w-full">
                                                    <button
                                                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                        type="submit"
                                                        style={{
                                                            background:
                                                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                                        }}
                                                    >
                                                        Log in
                                                    </button>
                                                </TERipple>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* <!-- Right column container with background and description--> */}
                                <div
                                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                    style={{
                                        background:
                                            "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                    }}
                                >
                                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                        <h4 className="mb-6 text-xl font-semibold">
                                            Label, Track, Secure: Your IP Address Guardian.
                                        </h4>
                                        <p className="text-sm">
                                            Our IP Address Management System (IPAMS) provides seamless labeling and audit trails for your IP addresses. With precise tracking and robust security measures, IPAMIS ensures efficient management while safeguarding against vulnerabilities. Join us in streamlining your IP address management, ensuring clarity, accountability, and network.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForm