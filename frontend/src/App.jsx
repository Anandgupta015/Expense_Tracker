import React, { useEffect, useState } from 'react';
import { getExpenses, createExpense, updateExpense, deleteExpense } from './api';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import TotalCard from './components/TotalCard';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  // --- Auth state ---
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedIn) setUser(loggedIn);
  }, []);

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  // --- Expense tracker state ---
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await getExpenses(user._id); // pass userId to backend
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchExpenses(); // fetch only if logged in
  }, [user]);

  const handleAdd = async (data) => {
    try {
      const res = await createExpense(data);
      setExpenses((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await updateExpense(id, data);
      setExpenses((prev) => prev.map((e) => (e._id === id ? res.data : e)));
      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const total = expenses.reduce((s, e) => s + Number(e.cost || 0), 0);

  // --- Render login/signup if not logged in ---
  if (!user) {
    return showSignup
      ? <Signup toggleLogin={() => setShowSignup(false)} />
      : <Login onLogin={setUser} toggleSignup={() => setShowSignup(true)} />;
  }

  // --- Render main expense tracker ---
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      {/* Header with logout */}
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded mb-6">
        <h2 className="text-lg font-bold">Welcome, {user.name}</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Expense Tracker */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left section - Form + List */}
        <div className="lg:col-span-2 space-y-6">
          <ExpenseForm
            user={user} // ✅ pass logged-in user
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

        {/* Right section - Total */}
        <div>
          <TotalCard total={total} />
        </div>
      </div>
    </div>
  );
}
