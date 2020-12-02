require('dotenv').config();
const mongoose = require('mongoose');

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const database = process.env.DB_DB;

mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.ibmgs.mongodb.net/${database}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.warn('we are connected');
});

module.exports = db;
