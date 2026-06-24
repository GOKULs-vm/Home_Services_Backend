import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import serviceRoutes from './routes/services.js'
import bookingRoutes from './routes/bookings.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    return res.json({
        message: 'This is Home_Services from Backend'
    });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`📡 SERVER: Server is running on port ${PORT}`);
    });
});
