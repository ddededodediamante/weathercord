import { accountsTable, sessionsTable } from "@/db/schema";
import { cookies } from "next/headers";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function GET(_: Request) {
  const authCookie = (await cookies()).get("auth")?.value;

  if (!authCookie) return new Response("Missing required cookie \"auth\"", { status: 401 });

  const sessionList = (await db.select().from(sessionsTable).where(eq(sessionsTable.code, authCookie))).values().toArray();
  if (!sessionList[0]) return new Response("Authorization token showed no results", { status: 401 });
  const session = sessionList[0];
  const account = (await db.select().from(accountsTable).where(eq(accountsTable.id, session.id))).values().toArray()[0];

  // this error is thrown if a session with the auth code was identified but the session's corresponding account doesn't exist
  // it should never happen :sob:
  if (!account) return new Response("this is weird", { status: 404 });

  return new Response(JSON.stringify({
    admin: !!account.admin,
    bio: account.bio ?? "",
    displayName: account.displayName && account.displayName.length > 1 ? account.displayName : account.username,
    email: account.email,
    id: account.id,
    joined: account.joined,
    nameFont: account.nameFont ?? "\"__nextjs-Geist\", \"Geist\", -apple-system, \"Source Sans Pro\", sans-serif",
    pronouns: account.pronouns ?? "",
    username: account.username
  }), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
