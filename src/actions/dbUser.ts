"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";

export default async function getDbUser() {
  //1st step: check if the user is signed in or not
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  //3rd step: if the user is signed in, return the user object
  const dbuser = await db.user.findUnique({
    where: {
      clerk_id: userId,
    },
  });

  if (!dbuser) {
    return null;
  }

  return dbuser;
}
