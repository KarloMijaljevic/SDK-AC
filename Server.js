// ===== Environment Variables =====
const dotenv = require('dotenv');
dotenv.config();
const db = process.env.MONGO_URI;

// ===== Import Custom Modules =====
const { checkIfUsersHaveLeft } = require("./Jobs/CheckIfUsersHaveLeft");

// ===== Cron Jobs =====
const cron = require('node-cron');
const checkIfAnyoneLeft = cron.schedule('*/10 * * * *', () => {
  console.log('Running every 10 minutes...');
});

// ===== Start Cron Jobs =====
checkIfAnyoneLeft.start();

// ===== MongoDB Setup =====
const mongoose = require('mongoose');
mongoose
   .connect(db)
   .then(() => console.log('MongoDb Connected...'))
   .catch(err => console.log(err));

// ===== Express App =====
const express = require("express");
const app = express();
app.use(express.json());

// ===== Routes =====
app.use('/users', require('./Routes/webAppGetUser'));
app.use('/users', require('./Routes/webAppPostUser'));
app.use('/openDoor', require('./Routes/mobileOverWiFiStart'));

// ===== PORT Listen =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
