const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const Constants = require('./utils/Constants');

// Middleware parser
app.use(bodyParser.json());

// Establish connection with mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB database has been connected successfully'))
    .catch(err => console.log(err));

//get the users route
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send(Constants.BASEROUTEMSG);
});

app.listen(3000, () => {

});
