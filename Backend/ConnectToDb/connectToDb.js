const mongoose = require('mongoose');
require('dotenv').config();
const connectToDb = () => {
    mongoose.connect(process.env.URL);
}
module.exports = connectToDb;