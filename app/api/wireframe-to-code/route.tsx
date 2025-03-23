import { db } from "@/configs/db";
import { usersTable, WireFrameToCodeTable } from "@/configs/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
export async function POST(req: NextRequest) {
  const { description, model, imageUrl, uid, email } = await req.json();

  const creditResults = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (creditResults[0]?.credits && creditResults[0]?.credits > 0) {
    const result = await db
      .insert(WireFrameToCodeTable)
      .values({
        uid: uid,
        description: description,
        imageUrl: imageUrl,
        model: model,
        createdBy: email,
      })
      .returning({ id: WireFrameToCodeTable.id });

      // update credits
      const data = await db.update(usersTable).set({
        credits: creditResults[0]?.credits - 1
      }).where(eq(usersTable.email, email));

    return NextResponse.json(result);
  }
  else
  {
    return NextResponse.json({"error":"You do not have enough credits"});
  }
}

export async function GET(req: NextRequest) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const uid = searchParams?.get("uid");
  const email = searchParams?.get("email");
  if (uid) {
    const result = await db
      .select()
      .from(WireFrameToCodeTable)
      .where(eq(WireFrameToCodeTable.uid, uid));
    return NextResponse.json(result[0]);
  } else if (email) {
    const result = await db
      .select()
      .from(WireFrameToCodeTable)
      .where(eq(WireFrameToCodeTable.createdBy, email));
    return NextResponse.json(result);
  }
  return NextResponse.json({ error: "record not found" });
}

export async function PUT(req: NextRequest) {
  const { uid, codeResp } = await req.json();
  const result = await db
    .update(WireFrameToCodeTable)
    .set({ code: codeResp })
    .where(eq(WireFrameToCodeTable.uid, uid))
    .returning({ uid: WireFrameToCodeTable.uid });
  return NextResponse.json(result);
}
