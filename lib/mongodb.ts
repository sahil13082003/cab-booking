import { MongoClient } from 'mongodb';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Ensure environment variables are defined
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;


if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

if (!dbName) {
  throw new Error('Please define the MONGODB_DB environment variable in .env.local');
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve connection across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  return client.db(dbName);
}