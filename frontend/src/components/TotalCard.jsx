import React from 'react'

export default function TotalCard({ total }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow sticky top-6">
      <div className="text-sm text-gray-500">Total Expense</div>
      <div className="text-3xl font-bold text-indigo-600 mt-2">
        ₹{total.toLocaleString()}
      </div>
    </div>
  )
}
