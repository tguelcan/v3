import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';
// Create a new MongoClient
export const client = new MongoClient(env.MONGODB_URI);

// Connect to the database
export const connect = async (): Promise<MongoClient> => client.connect();

// Disconnect from the database
export const disconnect = async (): Promise<void> => client.close();

// Get the database
export default client.db();
