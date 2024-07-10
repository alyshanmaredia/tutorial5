const express = require('express');
const router = express.Router();
const User = require('../models/user');
const getUser = require('../middleware/getUser');
const Constants = require('../utils/Constants');

// Get all users using GET
router.get(Constants.GETALLUSERS, async (req, res) => {
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

// Update user using PUT
router.put(Constants.PUTUSERBYID, async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, email } = req.body;

            // Find user by ID and update
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { firstName, email },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ error: Constants.RECORDNOTFOUND });
            }

        res.status(200).json({
            message: Constants.USERUPDATED,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
});

// Create new user using POST
router.post(Constants.ADDNEWUSER, async (req, res) => {
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


// Get single user using GET
router.get(Constants.GETUSERBYID, getUser, (req, res) => {
    res.status(200).json({
        success: true,
        user: res.locals.user
    });
});


module.exports = router;
