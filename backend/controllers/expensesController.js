import Expense from '../models/Expense.js';

// Get all expenses for a user
export const getExpenses = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    const expenses = await Expense.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('user', 'name email'); // ✅ populate user
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new expense
export const createExpense = async (req, res) => {
  try {
    const { title, cost, date, time, location, user } = req.body;
    if (!user) return res.status(400).json({ message: 'User ID is required' });

    const expense = await Expense.create({ title, cost, date, time, location, user });
    await expense.populate('user', 'name email'); // ✅ populate immediately
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Expense.findByIdAndUpdate(id, req.body, { new: true }).populate('user', 'name email');
    if (!updated) return res.status(404).json({ message: 'Expense not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
