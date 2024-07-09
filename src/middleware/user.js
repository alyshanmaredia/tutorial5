const User = require('../models/user');

// Middleware to get user by ID
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({
                message: 'Cannot find user',
                success: false
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
    res.user = {
        email: user.email,
        firstName: user.firstName,
        id: user._id
    };
    next();
}

module.exports = getUser;