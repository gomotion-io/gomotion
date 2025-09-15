import { validateCredit } from "@/app/api/utils/validate-credits";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { valid: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    await validateCredit(userId);

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Credit validation error:", error);

    if (error instanceof Error && error.message === "Insufficient credits") {
      return NextResponse.json(
        { valid: false, error: "Insufficient credits" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { valid: false, error: "Validation failed" },
      { status: 500 }
    );
  }
}
