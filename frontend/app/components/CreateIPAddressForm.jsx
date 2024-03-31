'use client'

import createAxios from "@app/lib/axios";
import React, { useState } from "react";
import { UserContext } from "@app/lib/context";
import { useContext } from "react";
import MaskedInput from "react-text-mask";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
    TETextarea
} from "tw-elements-react";
import InputError from "./InputError";

export default function IpAddressForm(props) {

    const userContext = useContext(UserContext);
    const axios = createAxios(userContext ? userContext.authToken : '');
    const csrf = () => axios.get('/sanctum/csrf-cookie');

    // const [isDisabled, setIsDisabled] = useState(disabled);

    // const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);

    const [ip_address, setIpAddress] = useState('');
    const [label, setLabel] = useState('');

    const propss = {
        guide: true,
        mask: value => {
            let result = [];
            const chunks = value.split(".");

            for (let i = 0; i < 4; ++i) {
                const chunk = (chunks[i] || "").replace(/_/gi, "");

                if (chunk === "") {
                    result.push(/\d/, /\d/, /\d/, ".");
                    continue;
                } else if (+chunk === 0) {
                    result.push(/\d/, ".");
                    continue;
                } else if (
                    chunks.length < 4 ||
                    (chunk.length < 3 && chunks[i].indexOf("_") !== -1)
                ) {
                    if (
                        (chunk.length < 2 && +`${chunk}00` > 255) ||
                        (chunk.length < 3 && +`${chunk}0` > 255)
                    ) {
                        result.push(/\d/, /\d/, ".");
                        continue;
                    } else {
                        result.push(/\d/, /\d/, /\d/, ".");
                        continue;
                    }
                } else {
                    result.push(...new Array(chunk.length).fill(/\d/), ".");
                    continue;
                }
            }

            result = result.slice(0, -1);
            return result;
        },
        pipe: value => {
            if (value === "." || value.endsWith("..")) return false;

            const parts = value.split(".");

            if (
                parts.length > 4 ||
                parts.some(part => part === "00" || part < 0 || part > 255)
            ) {
                return false;
            }

            return value;
        }
    };

    const submitForm = async (event) => {

        event.preventDefault();

        await csrf();

        props.setErrors({});
        setStatus(null);

        axios
            .post('/api/v1/ip-addresses', {
                ip_address,
                label,
            })
            .then(res => {
                if (res.data) {
                    props.fetchIpAddresses();
                    props.setShowModal(false);
                    props.setIpAddress("")
                    props.setLabel("")

                }
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                props.setErrors(error.response.data.errors)
            })

    }
    return (
        <section>
            <form onSubmit={submitForm}>
                <div>

                    <InputError messages={props.errors.ip_address} className="mt-2" />
                    <MaskedInput
                        id="input_ip"
                        aria-label="IP Address"
                        placeholder="IP Address"
                        className="ip-input-border peer block min-h-[auto] w-full rounded transition-all duration-200 ease-linear read-only:bg-neutral-100 dark:disabled:bg-neutral-700 dark:read-only:bg-neutral-700 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary px-3 py-[0.32rem] leading-[1.6] text-neutral-800 dark:text-neutral-200 mb-6"
                        onChange={event => {
                            props.setIpAddress(event.target.value)
                            setIpAddress(event.target.value)
                        }}
                        value={props.ip_address}
                        {...propss}
                    />

                </div>
                <div className="relative mb-6">

                    <InputError messages={props.errors.label} className="mt-2" />
                    <TETextarea
                        id="input_label"
                        label="Label"
                        rows={3}
                        onChange={event => {
                            props.setLabel(event.target.value)
                            setLabel(event.target.value)
                        }}
                        value={props.label}
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
        </section>
    );
} 
