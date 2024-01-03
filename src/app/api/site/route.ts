import { db } from "@/server/db";
import { sites } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = (await req.json()) as {
    id: string;
  };
  const data = await db.query.sites.findFirst({
    where: eq(sites.userId, id),
    with: {
      products: true,
    },
  });
  return NextResponse.json(data);
}
