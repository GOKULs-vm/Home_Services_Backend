import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    preferredDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
            message: '{VALUE} is not supported'
        },
        default: 'Pending'
    },
    notes: {
        type: String,
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking