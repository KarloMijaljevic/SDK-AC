// ===== Environment Variables =====
const dotenv = require("dotenv");
dotenv.config();
const db = process.env.MONGO_URI;

// ===== Import Custom Modules =====
const checkIfUsersHaveLeft = require("./Jobs/CheckIfUsersHaveLeft");
const startNewDate = require("./Jobs/StartNewDate");
const initialServerStart = require ("./Functions/InitialServerStart");

// ===== Cron Jobs =====
// const cron = require("node-cron");
// const checkIfAnyoneLeft = cron.schedule("*/5 * * * *", () => {
//   checkIfUsersHaveLeft();
// });
// const startWorkDay = cron.schedule("0 0 * * *", () => {
//   startNewDate();
// });

// ===== Start Cron Jobs =====
// console.log("Will be running user check every 5 minutes");
// checkIfAnyoneLeft.start();
// console.log("Will be starting work day every new day at 00:00");
// startWorkDay.start();

// ===== MongoDB Setup =====
const mongoose = require("mongoose");
mongoose
   .connect(db)
   .then(() => console.log("MongoDb Connected..."))
   .catch(err => console.log(err));

// ===== Express App =====
const express = require("express");
const app = express();
app.use(express.json());

// ===== Routes =====
app.use("/users", require("./Routes/WebAppGetUser"));
app.use("/users", require("./Routes/WebAppPostUser"));
app.use("/dates", require("./Routes/WebAppGetDate"));
app.use("/userDates", require("./Routes/MobileGetDate"));
app.use("/openDoor", require("./Routes/MobileOverWiFiStart"));
app.use("/homeWork", require("./Routes/MobileWorkFromHome"));

// ===== First time setup =====
initialServerStart();

// ===== PORT Listen =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
