const User = require('../models/userModels');
const bcrypt = require('bcrypt');

async function signup(req, res) {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = await User.create({ email, password });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        } else if (email != user.email) {
            return res.status(400).json({ message: 'Invalid email.' });
        } else if (password != user.password) {
            return res.status(400).json({ message: 'Invalid password.' });
        } else {
            res.json({ message: 'Login successful' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    signup,
    login
};
