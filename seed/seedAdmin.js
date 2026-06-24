import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import Admin from '../models/Admin.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join( __dirname, '../.env' ) });

const ADMIN_USERNAME = 'home_services';
const ADMIN_PASSWORD = 'home_services123';

const seedAdmin = async () => {
    try {
        await connectDB();
        console.log(`\n🍃 MONGO_DB CONNECTED: MongoDB connected successfully for seeding...`);

        const adminExists = await Admin.findOne({ username: ADMIN_USERNAME });
        if (adminExists) {
            console.log(`⚠️ WARNING: Admin already exists with username: ${ADMIN_USERNAME}`);
            process.exit(0);
        }

        console.log('🔐 Hashing password...');
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

        const admin = await Admin.create({
            username: ADMIN_USERNAME,
            password: hashedPassword
        });
        console.log(`✅ Admin seeded successfully with username: ${ADMIN_USERNAME}`);

        await mongoose.connection.close();
        console.log(`🍃 MONGO_DB DISCONNECTED: MongoDB disconnected successfully for seeding...`);
        process.exit(0);
        
        
    }
    catch (e) {
        console.error(`❌ Error seeding admin: ${e.message}`);
        process.exit(1);
    }
};

seedAdmin();
