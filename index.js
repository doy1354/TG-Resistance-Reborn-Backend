const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoURI = process.env.MONGO_DB || "mongodb://localhost:27017/Resistance_reborn";
// Include route files
const usersRoute = require('./routes/user');

const url = mongoURI;
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

app.use(express.json());

const corsOptions = {
  origin: '*', // Replace with your allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

try {
  con.on('open', () => {
    console.log('Connected to the database');
  })
} catch (error) {
  console.log("Error: " + error);
}

// Use routes
app.use('/users', usersRoute);

// Specify the port to listen on
const port = 5000;

// Start the server
app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`);
});