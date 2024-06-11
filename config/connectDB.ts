require('dotenv').config();
const mongoose = require('mongoose');

export default async function connectDB () {
  try {
    mongoose.connect(process.env.DATABASE_CONN!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    connection.on('error', (err: string) => {
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running. ' + err
      );
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong!');
    console.log(error);
  }
};

connectDB();