const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017');
    console.log('Connected');
  } catch (error) {
    console.log('error');
  }
}

module.exports = { connect };
