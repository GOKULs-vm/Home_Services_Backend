import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`\n🍃 MONGO_DB CONNECTED: ${ conn.connection.host }`);
    }
    catch (e) {
        console.error(`\n ERROR: ${ e.message }`);
        process.exit(1);
    }
};

export default connectDB