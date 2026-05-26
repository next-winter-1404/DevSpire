"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RegisterStep1View from "../components/RegisterStep1Form";
import RegisterStep2View from "../components/RegisterStep2Form";
import RegisterStep3View from "../components/RegisterStep3Form";
import { useCallback } from "react";

export default function RegisterView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentStep = Number(searchParams.get("step")) || 1;
    const [formData, setFormData] = useState({
        phoneNumber: "",
        otp: "",
        password: "",
    });
    const updateFormData = useCallback((newData: any) => {
        setFormData(prev => ({ ...prev, ...newData }));
    }, []); 

    const nextStep = useCallback(() => {
        const next = Math.min(currentStep + 1, 3);
        router.push(`?step=${next}`);
    }, [currentStep, router]); 
    const prevStep = () => {
        const prev = Math.max(currentStep - 1, 1);
        router.push(`?step=${prev}`);
    };

    return (
        <div className="w-full flex justify-center p-4">
            {currentStep === 1 && (
                <RegisterStep1View
                    data={formData}
                    updateData={updateFormData}
                    next={nextStep}
                />
            )}
            {currentStep === 2 && (
                <RegisterStep2View
                    data={formData}
                    updateData={updateFormData}
                    next={nextStep}
                    back={prevStep}
                />
            )}
            {currentStep === 3 && (
                <RegisterStep3View
                    back={prevStep}
                    data={formData}
                    updateData={updateFormData}
                />

            )}
        </div>
    );
}
