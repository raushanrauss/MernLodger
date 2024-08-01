const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const db = process.env.MONGO_URL;

        // Connect to MongoDB
        const { connection } = await mongoose.connect(db);

        console.log(`MongoDB Connected to Database`);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
