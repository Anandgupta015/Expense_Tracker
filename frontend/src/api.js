import axios from 'axios';

const API = axios.create({
  baseURL: 'https://expense-tracker-backend-jo84.onrender.com/api/expenses',
});

// Get all expenses (pass userId)
export const getExpenses = (userId) => API.get(`/?userId=${userId}`);

// Create new expense
export const createExpense = (data) => API.post('/', data);

// Update expense
export const updateExpense = (id, data) => API.put(`/${id}`, data);

// Delete expense
export const deleteExpense = (id) => API.delete(`/${id}`);
