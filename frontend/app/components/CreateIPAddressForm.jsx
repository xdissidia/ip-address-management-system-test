'use client'

import React, { useState } from "react";
import { TEInput, TERipple, TETextarea } from "tw-elements-react";
import MaskedInput from "react-text-mask";

export default function IpAddressForm({ disabled = false }) {

    const [isDisabled, setIsDisabled] = useState(disabled);

    const props = {
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

    return (
        <section>
            <div>
                <MaskedInput
                    aria-label="IP Address"
                    placeholder="IP Address"
                    className="ip-input-border peer block min-h-[auto] w-full rounded transition-all duration-200 ease-linear read-only:bg-neutral-100 dark:disabled:bg-neutral-700 dark:read-only:bg-neutral-700 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary px-3 py-[0.32rem] leading-[1.6] text-neutral-800 dark:text-neutral-200 mb-6"
                    {...props}
                />
            </div>
            <div className="relative mb-6">
                <TETextarea
                    id="exampleFormControlTextarea13"
                    label="Label"
                    rows={3}
                />
            </div>
        </section>
    );
}