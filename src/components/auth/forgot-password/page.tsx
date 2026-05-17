"use client";

import { useState } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import AuthLayout from "../AuthLayout";

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1);

    return (
        <AuthLayout>
            {step === 1 && <Step1 next={() => setStep(2)} />}
            {step === 2 && (
                <Step2
                    next={() => setStep(3)}
                    back={() => setStep(1)}
                />
            )}
            {step === 3 && <Step3 back={() => setStep(2)} />}
        </AuthLayout>
    );
}
