const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find().populate('seller', 'name email');
    res.json(products);
});

// Add product
router.post('/', protect, async (req, res) => {
    const { name, description, price, image } = req.body;
    const product = await Product.create({ name, description, price, image, seller: req.user._id });
    res.json(product);
});

// Get product by id
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('seller', 'name email');
    res.json(product);
});

// Update product
router.put('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.seller.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete product
router.delete('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.seller.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });
        await product.remove();
        res.json({ message: 'Product removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
