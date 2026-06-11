import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { lat, lng } = await req.json();

    const res = await fetch(
      `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`,
      {
        method: "GET",
        headers: {
          "Api-Key": process.env.GEO_KEY!,
        },
      },
    );
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({
        message: "something went wrong",
        error: data,
      });
    } else {
      return NextResponse.json({ data });
    }
  } catch (err) {
    return NextResponse.json({ message: "server error", err }, { status: 500 });
  }
};
