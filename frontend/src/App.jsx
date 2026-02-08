import React, { useEffect, useState } from 'react';
import { getExpenses, createExpense, updateExpense, deleteExpense } from './api';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import TotalCard from './components/TotalCard';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedIn) setUser(loggedIn);
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  // Fetch expenses for user
  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await getExpenses(user._id);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchExpenses();
  }, [user]);

  // Add expense
  const handleAdd = async (data) => {
    data.user = user._id; // associate expense with logged-in user
    try {
      const res = await createExpense(data);
      setExpenses((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  // Update expense
  const handleUpdate = async (id, data) => {
    try {
      const res = await updateExpense(id, data);
      setExpenses((prev) => prev.map((e) => (e._id === id ? res.data : e)));
      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete expense
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate total cost
  const total = expenses.reduce((sum, e) => sum + Number(e.cost || 0), 0);

  // Show Login or Signup if user not logged in
  if (!user)
    return showSignup ? (
      <Signup toggleLogin={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={setUser} toggleSignup={() => setShowSignup(true)} />
    );

  // ✅ Main UI when logged in
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded mb-6">
        <h2 className="text-lg font-bold">Welcome, {user.name}</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Expense Form + List */}
        <div className="lg:col-span-2 space-y-6">
          <ExpenseForm
            user={user}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            editing={editing}
            setEditing={setEditing}
          />
          <ExpenseList
            expenses={expenses}
            loading={loading}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        </div>

        {/* Right: Total Card */}
        <div>
          <TotalCard total={total} />
        </div>
      </div>
    </div>
  );
}
