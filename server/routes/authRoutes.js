const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/login', async (req, res) => {
    const {email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials'});

        res.status(200).json({ message: 'Login successfull'});
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.post('/register', async (req, res) => {
    const {fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required'});
    }

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists'});
        }

        const newUser = new User({
            fullName,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = router;