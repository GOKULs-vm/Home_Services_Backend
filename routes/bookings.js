import express from 'express'
import Booking from '../models/Booking.js'
import authMiddleware from '../middleware/authMiddleware.js'

const bookingRoutes = express.Router();

bookingRoutes.post('/', async (req, res) => {
    try {
        const { customerName, phone, address, serviceType, preferredDate, notes } = req.body;
        if (!customerName || !phone || !address || !serviceType || !preferredDate) {
            return res.status(400).json({
                message: '✏️ All fields are required'
            });
        }
        const newBooking = await Booking.create({
            customerName, phone, address, serviceType, preferredDate, notes
        });
        res.status(201).json({
            message: '🥳 Booking created successfully',
            data: newBooking
        });
    }
    catch (e) {
        console.error(`\n ERROR: ${ e.message }`);
        res.status(500).json({
            message: '❌ Something went wrong when creating booking',
            error: e.message
        });
    }
});

bookingRoutes.get('/status/:phone', async (req, res) => {
    try {
        const { phone } = req.params;
        const bookingStatus = await Booking.find({ phone });
        if (!bookingStatus || bookingStatus.length === 0) {
            return res.status(404).json({
                message: '❌ Booking status not found'
            });
        }
        res.status(200).json({
            message: '🥳 Booking status fetched successfully',
            data: bookingStatus
        });
    }
    catch (e) {
        console.error(`\n ERROR: ${ e.message }`);
        res.status(500).json({
            message: '❌ Something went wrong when fetching booking ',
            error: e.message
        });
    }
});

bookingRoutes.get('/', authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        if (!bookings || bookings.length === 0) {
            return res.status(200).json({
                message: '❌ Bookings not found'
            });
        }
        res.status(200).json({
            message: '🥳 Bookings fetched successfully',
            data: bookings
        });
    }
    catch (e) {
        console.error(`\n ERROR: ${ e.message }`);
        res.status(500).json({
            message: '❌ Something went wrong when fetching bookings',
            error: e.message
        });
    }
});

bookingRoutes.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: '✏️ Invalid or missing booking status.'
            });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            id, { status }, { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({
                message: '❌ Booking not found'
            });
        }

        res.status(200).json({
            message: '🥳 Booking status updated successfully',
            data: updatedBooking
        });

    }
    catch (e) {
        console.error(`\n UPDATE BOOKING ERROR: ${ e.message }`);
        res.status(500).json({
            message: '❌ Something went wrong with updating booking status',
            error: e.message
        });
    }
})

export default bookingRoutes