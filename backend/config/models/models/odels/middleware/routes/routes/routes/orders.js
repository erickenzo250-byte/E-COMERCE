const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

// Create order
router.post('/', protect, async (req, res) => {
    const { products, totalPrice } = req.body;
    const order = await Order.create({ user: req.user._id, products, totalPrice });
    res.json(order);
});

// Get user orders
router.get('/myorders', protect, async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate('products.product');
    res.json(orders);
});

module.exports = router;
