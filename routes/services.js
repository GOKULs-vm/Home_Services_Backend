import express from 'express'
import Service from '../models/Service.js'

const serviceRoutes = express.Router();

serviceRoutes.get('/', async (req, res) => {
    try {
        const services = await Service.find({ isAvailable: true });
        if (services.length === 0) {
            return res.status(404).json({
                message: '❌ Services not found'
            });
        }
        res.status(200).json({
            message: '🥳 Services fetched successfully',
            data:services
        });
    }
    catch (e) {
        console.error(`\n ERROR: ${ e.message }`);
        res.status(500).json({
            message: '❌ Something went wrong',
            error: e.message
        });
    }
});

serviceRoutes.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: '✏️ Service ID is required'
            });
        }
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({
                message: '❌ Service not found'
            });
        }
        res.status(200).json({
            message: '🥳 Service fetched successfully',
            data: service
        });
    }
    catch (e) {
        console.error(`\n ERROR: ${ e.message }`);
        res.status(500).json({
            message: '❌ Something went wrong',
            error: e.message
        });
    }
});

serviceRoutes.post('/', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            return res.status(400).json({
                message: '✏️ All fields are required'
            });
        }
        const newService = await Service.create({ name, description, price });
        res.status(201).json({
            message: '🥳 Service created successfully',
            data: newService
        });
    }
    catch (e) {
        console.error(`\n ERROR: ${ e.message }`);
        res.status(500).json({
            message: '❌ Something went wrong',
            error: e.message
        });
    }
});

export default serviceRoutes

