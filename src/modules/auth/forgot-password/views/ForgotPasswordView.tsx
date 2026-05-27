"use client";
import { useState, useCallback } from "react";
import ForgotPasswordStep1 from "../components/ForgotPasswordStep1Form";
import ForgotPasswordStep2 from "../components/ForgotPasswordStep2Form";
import ForgotPasswordStep3 from "../components/ForgotPasswordStep3Form";

export default function ForgotPasswordView() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    email: "",
    userId: "",
    resetCode: "",
  });

  const updateData = useCallback((newData: Partial<typeof data>) => {
    setData((prev) => ({ ...prev, ...newData }));
  }, []);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <div className="w-full h-full ">
      {step === 1 && (
        <ForgotPasswordStep1 next={next} updateData={updateData} />
      )}

      {step === 2 && (
        <ForgotPasswordStep2
          next={next}
          back={back}
          data={data}
          updateData={updateData}
        />
      )}

      {step === 3 && <ForgotPasswordStep3 back={back} data={data} />}
    </div>
  );
}
