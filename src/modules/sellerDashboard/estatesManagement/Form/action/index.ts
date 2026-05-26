"use server";

import { cookies } from "next/headers";
import { IGeneraData, IHousePayload } from "../types";
import { redirect } from "@/i18n/routing";

export const EditOrCreateEstateAction = async (
  prevData: {
    data: IGeneraData;
    error: Record<string, string> | null;
    success: boolean;
  },
  formData: FormData,
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) {
    redirect({
      href: "/",
      locale: "fa",
    });
  }

  const payload = {
    ...prevData.data.step1,
    ...prevData.data.step2,
    ...prevData.data.step3,
  } as IHousePayload;

  const isEdit = !!prevData.data.id;

  const url = isEdit
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/houses/${prevData.data.id}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/houses`;

  try {
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return { data: prevData.data, error: null, success: true };
    }
    const errorData = await res.json().catch(() => ({}));
    console.log(errorData);

    return {
      data: prevData.data,
      error: {
        message: errorData?.message || "اطلاعات ارسال شده ناقص است",
      },
      success: false,
    };
  } catch (err) {
    return {
      data: prevData.data,
      error: { message: "خطا در برقراری ارتباط با سرور" },
      success: false,
    };
  }
};
