///lib/mongodb.js:
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const options = {
  tls: true, // Enable TLS/SSL for connection security (ensure your cluster supports it)
  serverSelectionTimeoutMS: 5000, // Timeout for server selection
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the client across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client for each serverless function execution
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
