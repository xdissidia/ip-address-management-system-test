'use client'

import React, { useContext, useState } from "react";
import { TEInput, TERipple, TETextarea, TEModalBody } from "tw-elements-react";
import MaskedInput from "react-text-mask";
import { UserContext } from "@app/lib/context";
import createAxios from "@app/lib/axios";

export default function UpdateLabelForm({ item }) {

    const userContext = useContext(UserContext);
    const axios = createAxios(userContext ? userContext.authToken : '');
    const csrf = () => axios.get('/sanctum/csrf-cookie');
    const [label, setLabel] = useState('');
    
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);

    const submitForm = async (event) => {

        event.preventDefault();

        await csrf();

        setErrors({});
        setStatus(null);

        axios
            .patch(`/api/v1/ip-addresses/${item.id}`, {
                label,
            })
            .then(res => {
                if (res.data) {
                    
                }
            })
            .catch(error => {
                console.log(error)
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })

    }

    return (
        <section>
            <TEModalBody>
                <form onSubmit={submitForm}>
                    <TEInput
                        type="text"
                        label="IP Address"
                        className="mb-6"
                        defaultValue={item.ip_address}
                        readOnly
                    />
                    <div className="relative mb-6">
                        <TETextarea
                            id="exampleFormControlTextarea13"
                            label="Label"
                            rows={3}
                            defaultValue={item.label}
                            onChange={event => setLabel(event.target.value)}
                        />
                    </div>
                    <TERipple rippleColor="light">
                        <button
                            type="submit"
                            className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                            Save changes
                        </button>
                    </TERipple>
                </form>
            </TEModalBody>
        </section>
    );
}
