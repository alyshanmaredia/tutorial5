const express = require('express');
const router = express.Router();
const User = require('../models/user');
const getUser = require('../middleware/user');
const Constants = require('../utils/constants');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        const formattedUsers = users.map(user => ({
            email: user.email,
            firstName: user.firstName,
            id: user._id
        }));
        res.status(200).json({
            message: Constants.ALLUSERSFOUND,
            success: true,
            users: formattedUsers
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false
        });
    }
});

// Update user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.firstName != null) {
        res.user.firstName = req.body.firstName;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }

    try {
        const updatedUser = await res.user.save();
        res.status(200).json({
            message: Constants.USERUPDATED,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false
        });
    }
});

// Create new user
router.post('/', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        email: req.body.email
    });

    try {
        const newUser = await user.save();
        res.status(201).json({
            message: Constants.USERADDED,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false
        });
    }
});


// Get single user
router.get('/:id', getUser, (req, res) => {
    res.status(200).json({
        success: true,
        user: res.user
    });
});





module.exports = router;
