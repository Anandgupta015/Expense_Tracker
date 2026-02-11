import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import expensesRoutes from './routes/expenses.js';
import usersRoutes from './routes/users.js';

dotenv.config();

const app = express();

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes (lowercase best practice)
    app.use('/api/users', usersRoutes);
    app.use('/api/expenses', expensesRoutes);

    // Default route
    app.get('/', (req, res) => {
      res.send('Expense Tracker API is running');
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server start error:", error);
  }
};

startServer();
