import React, { useState } from 'react';

export default function Signup({ toggleLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('All fields are required');
      return;
    }

    try {
      const res = await fetch(
        'https://expense-tracker-backend-jo84.onrender.com/api/users/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Signup failed');
        return;
      }

      alert('Signup successful! Please login.');
      toggleLogin();

    } catch (err) {
      console.error(err);
      alert('Server error. Try again later.');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <form onSubmit={submit} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-3 text-sm text-center">
        Already have an account?{' '}
        <span
          onClick={toggleLogin}
          className="text-indigo-600 cursor-pointer font-medium"
        >
          Login
        </span>
      </p>
    </div>
  );
}
