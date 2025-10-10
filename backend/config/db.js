import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const connectDB = async () => {
try {
const uri = process.env.MONGO_URI;
await mongoose.connect(uri, {
// mongoose 7+ doesn't need extra options
});
console.log('MongoDB connected');
} catch (err) {
console.error('MongoDB connection error:', err.message);
process.exit(1);
}
};


export default connectDB;