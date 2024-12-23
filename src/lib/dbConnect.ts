import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri || mongoUri.trim() === "") {
    console.error("MongoDB URI is not defined or is empty.");
    return;
  }

  try {
    const db = await mongoose.connect(mongoUri, {});

    connection.isConnected = db.connections[0].readyState;

    console.log("Connected to Database Successfully");
  } catch (err) {
    console.log("Failed to Connect Database", err);
    process.exit(1);
  }
}

export default dbConnect;
