import { db } from "@/server/db";
import { sites, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7,
  );

  const { name, userId } = (await req.json()) as {
    name: string;
    userId: string;
  };

  const nano = nanoid();

  await db.insert(sites).values({
    id: nano,
    userId,
    name,
  });

  await db.update(users).set({ siteId: nano }).where(eq(users.id, userId));

  return NextResponse.json("ok");
}
