import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/admin";

const ADMIN_EMAIL = "sakibmirza.05.17@gmail.com";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();
    const decoded = await adminAuth.verifyIdToken(idToken);

    // 🔒 Sirf admin sync kar sakta hai
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Sirf admin sync kar sakta hai" }, { status: 403 });
    }

    // Firebase ke SAARE users uthao
    let allUsers: any[] = [];
    let pageToken: string | undefined;
    do {
      const result = await adminAuth.listUsers(1000, pageToken);
      allUsers = allUsers.concat(result.users);
      pageToken = result.pageToken;
    } while (pageToken);

    // Realtime Database mein likho
    const updates: Record<string, any> = {};
    for (const u of allUsers) {
      updates[`users/${u.uid}`] = {
        uid: u.uid,
        name: u.displayName || "Unknown",
        email: u.email || "",
        photo: u.photoURL || "",
        lastActive: u.metadata.lastSignInTime
          ? new Date(u.metadata.lastSignInTime).getTime()
          : Date.now(),
      };
    }
    await adminDb.ref().update(updates);

    return NextResponse.json({ synced: allUsers.length });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}