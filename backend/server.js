import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import expensesRoutes from './routes/expenses.js';
import usersRoutes from './routes/users.js';

import User from "./models/User.js";   // 👈 ADD
import Expense from "./models/Expense.js"; // 👈 ADD

dotenv.config();

const app = express();

// Connect to MongoDB and insert test data
const startServer = async () => {
  await connectDB();

  // 🔥 TEMP TEST DATA INSERT
  const user = await User.create({
    name: "Anand",
    email: "anand@test.com",
    password: "123456"
  });

  await Expense.create({
    title: "Pizza",
    cost: 500,
    date: "2026-02-11",
    time: "8 PM",
    location: "Delhi",
    user: user._id
  });

  console.log("Test data inserted ✅");

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/Users', usersRoutes);
  app.use('/api/expenses', expensesRoutes);

  app.get('/', (req, res) => {
    res.send('Expense Tracker API is running');
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', error: err.message });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
