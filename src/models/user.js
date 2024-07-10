const mongoose = require('mongoose');

//User Schema file that is used to store and retrieve data from mongodb cloud
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', UserSchema);
