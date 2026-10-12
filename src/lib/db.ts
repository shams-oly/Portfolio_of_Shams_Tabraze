import "server-only";
import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "portfolio";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: Promise<MongoClient> | undefined;
}

export const hasDb = Boolean(uri);

export async function getDb(): Promise<Db> {
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000,
      appName: "shams-portfolio",
    }).connect();
    global._mongoClient.catch(() => {
      global._mongoClient = undefined;
    });
  }
  const client = await global._mongoClient;
  return client.db(dbName);
}
