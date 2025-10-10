
import React from 'react'
import ExpenseItem from './ExpenseItem'

export default function ExpenseList({ expenses, loading, onEdit, onDelete }) {
  if (loading) return <div className="p-4 bg-white rounded shadow">Loading...</div>
  if (!expenses.length) return <div className="p-4 bg-white rounded shadow">No expenses yet</div>

  return (
    <div className="space-y-3">
      {expenses.map((exp) => (
        <ExpenseItem key={exp._id} exp={exp} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
