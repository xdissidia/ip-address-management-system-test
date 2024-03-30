'use client'

import React, { useState } from "react";
import { TEInput, TERipple, TETextarea } from "tw-elements-react";
import MaskedInput from "react-text-mask";

export default function UpdateLabelForm({ disabled = false }) {

    return (
        <section>
            <TEInput
                type="text"
                label="IP Address"
                className="mb-6"
                readOnly
            />
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
