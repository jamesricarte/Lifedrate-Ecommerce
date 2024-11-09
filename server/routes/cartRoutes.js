const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const router = express.Router();

router.post('/cart', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne( { userId} );

        if (!cart) {
            cart = new Cart({ userId, products: [ {productId, quantity}]});
        } else {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (productIndex > -1) {
                cart.products[[productIndex]].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity});
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error});
    }
})

router.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne( {userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error });
    }
})

module.exports = router;