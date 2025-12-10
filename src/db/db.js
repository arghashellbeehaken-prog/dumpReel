import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if(!MONGO_URI) {
  throw new Error("MONGO_URI is not found!");
}

const cached = global.mongoose | null;

if(!cached){
    cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        const options = {
            bufferCommands: false,
            maxPoolSize: 10,
        };
        cached.promise = mongoose.connect(MONGO_URI, options).then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;
    }
    catch {
        cached.promise = null;
        throw Error("Database connection failed");
    }
    return cached.conn;
};

export default dbConnect;