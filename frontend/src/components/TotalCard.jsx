import React from 'react'

export default function TotalCard({ total }) {
  return (
    <div className="
      sticky top-6
      p-6 rounded-2xl
      bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600
      shadow-[0_20px_50px_rgba(99,102,241,0.45)]
      text-white
    ">
      <div className="text-sm opacity-90 tracking-wide">
        Total Expense
      </div>

      <div className="text-4xl font-extrabold mt-2">
        ₹{total.toLocaleString()}
      </div>

      <div className="mt-3 text-xs opacity-80">
        This month spending
      </div>
    </div>
  )
}
