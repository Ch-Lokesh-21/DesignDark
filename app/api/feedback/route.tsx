
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { Feedback } from "@/configs/schema";
export async function POST(req: NextRequest) {
    const { email, subject, message } = await req.json();
    const result = await db.insert(Feedback).values({
        email: email,
        subject: subject,
        message: message,
    }).returning({ id: Feedback.id });
    return NextResponse.json(result[0]);
}