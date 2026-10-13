import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// local এ কিছু network এ mongodb+srv এর DNS lookup ব্যর্থ হয় (querySrv ECONNREFUSED)।
// তাই development এ Google/Cloudflare DNS ব্যবহার করা হচ্ছে।
if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

// dev এ hot reload এ বারবার connection না খোলার জন্য
const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };

const client =
  globalForMongo.mongoClient ?? new MongoClient(process.env.MONGODB_URI as string);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // sign up এর পর login page এ পাঠাব
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});