import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connected Successfully !");
  } catch (error) {
    console.log("DB Connection Failed!", error);
  }
}

export default connectDB;