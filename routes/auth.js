import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const authRoutes = express.Router()

authRoutes.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: '✏️ All fields are required'
            });
        }
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({
                message: '❌ Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                message: '❌ Invalid credentials'
            });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            message: '🥳 Logged in successfully',
            token
        });
    }
    catch (e) {
        console.error(`\n LOGIN ERROR: ${ e.message }`);
        res.status(500).json({
            message: '❌ Something went wrong',
            error: e.message
        });
    }
});

export default authRoutes