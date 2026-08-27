import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";
import fs from "fs";
import path from "path";

const serviceAccountPath = path.join(process.cwd(), "lib", "serviceAccount.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(serviceAccount),
      databaseURL: "https://kuk-notes-a48c1-default-rtdb.firebaseio.com",
    });

export const adminAuth = getAuth(app);
export const adminDb = getDatabase(app);