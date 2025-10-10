import React, { useState } from 'react';

export default function Login({ onLogin, toggleSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Both fields are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Invalid credentials');
        return;
      }

      // Save logged-in user in localStorage and update app state
      localStorage.setItem('loggedInUser', JSON.stringify(data));
      onLogin(data);
    } catch (err) {
      console.error(err);
      alert('Server error. Try again later.');
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
      <p className="mt-3 text-sm text-center">
        Don't have an account?{' '}
        <span onClick={toggleSignup} className="text-indigo-600 cursor-pointer font-medium">
          Sign Up
        </span>
      </p>
    </div>
  );
}
