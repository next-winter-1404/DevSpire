import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { messages, type, blogsDetail, houseDetail } = await req.json();
  let houses = [];
  let systemContent = "";

  if (type === "chat") {
    houses = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/houses?limit=20`,
    ).then((res) => res.json());

    systemContent = `
تو دستیار هوشمند سایت املاک هستی.


اطلاعات املاک:

${JSON.stringify(houses)}

فقط بر اساس اطلاعات بالا پاسخ بده.
`;
  }

  if (type === "blog") {
    systemContent = `
تو نویسنده حرفه‌ای مقالات املاک هستی.


بر اساس اطلاعات زیر مقاله کامل بنویس:

${JSON.stringify(blogsDetail)}
`;
  }

  if (type == "createHouse") {
    systemContent = `
  تو نویسنده حرفه‌ای توضیحات یک ملک هستی.

  بر اساس اطلاعات زیر توضیحات تکمیلیه ملک را بنویس بنویس:

  ${JSON.stringify(houseDetail)}


  `;
  }

  const systemPrompt = {
    role: "system",
    content: systemContent,
  };

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nex-agi/nex-n2-pro:free",
          stream: false,
          messages: [systemPrompt, ...messages],
          reasoning: { enabled: true },
        }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            data.error?.message || "مشکلی در ارتباط با هوش مصنوعی پیش آمد",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      { data },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "server error" },
      {
        status: 500,
      },
    );
  }
};
