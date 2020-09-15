import { MongoClient, config } from "../deps.ts";

// Safe mode in Deno will produce an error if an environment variable is missing
const { MONGO_URI, MONGO_DB } = config({ safe: true });

const client = new MongoClient();
client.connectWithUri(MONGO_URI);
const db = client.database(MONGO_DB);

export default db;
