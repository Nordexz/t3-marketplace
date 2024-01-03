"use server";

import { db } from "@/server/db";
import { sites } from "@/server/db/schema";
import { useSession } from "next-auth/react";

export async function createSite() {
  const { data } = useSession();
  if (!data) {
    return {
      error: "Not authenticated",
    };
  }
  
  const res = db.insert(sites).values({
    id: "3",
    userId: data?.user.id ?? "",
    name: data?.user.name ?? "",
  });

  return res;
}
