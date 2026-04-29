"use client";
import { useState } from "react";
import AuthLayout from "./components/AuthLayout";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

export default function RegisterPage() {
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
