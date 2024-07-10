const GetUser = require('../models/user');
const Constants = require('../utils/Constants');
/*
 Middleware to get user by ID
  utilizing by get/id API
  */
async function getUser(req, res, next) {
    try {
        const user = await GetUser.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: Constant.RECORDNOTFOUND,
                success: false
            });
        }
        res.locals.user = {
            email: user.email,
            firstName: user.firstName,
            id: user._id
        };
        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}
module.exports = getUser;