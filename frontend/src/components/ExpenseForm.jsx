import React, { useEffect, useState } from 'react'

const empty = { title: '', cost: '', date: '', time: '', location: '' }

export default function ExpenseForm({ user, onAdd, onUpdate, editing, setEditing }) {
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || '',
        cost: editing.cost || '',
        date: editing.date || '',
        time: editing.time || '',
        location: editing.location || ''
      })
    } else setForm(empty)
  }, [editing])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.title || !form.cost || !form.date)
      return alert('Title, cost, and date are required!')

    const expenseData = { ...form, user: user._id }

    editing ? onUpdate(editing._id, expenseData) : onAdd(expenseData)
    setForm(empty)
  }

  const cancelEdit = () => {
    setEditing(null)
    setForm(empty)
  }

  return (
    <form
      onSubmit={submit}
      className="
        bg-white/70 backdrop-blur-xl
        border border-indigo-200
        p-5 rounded-2xl
        shadow-[0_10px_40px_rgba(99,102,241,0.25)]
      "
    >
      <h2 className="text-lg font-bold text-indigo-700 mb-4">
        {editing ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Expense title"
          className="
            px-4 py-2 rounded-lg
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            bg-white/80
          "
        />

        {/* Cost */}
        <input
          name="cost"
          value={form.cost}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          className="
            px-4 py-2 rounded-lg
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            bg-white/80
          "
        />

        {/* Date */}
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
          className="
            px-4 py-2 rounded-lg
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-purple-500
            bg-white/80
          "
        />

        {/* Time */}
        <input
          name="time"
          value={form.time}
          onChange={handleChange}
          type="time"
          className="
            px-4 py-2 rounded-lg
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-purple-500
            bg-white/80
          "
        />

        {/* Location */}
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location (optional)"
          className="
            md:col-span-2
            px-4 py-2 rounded-lg
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-pink-500
            bg-white/80
          "
        />
      </div>

      <div className="flex gap-3 mt-5">
        <button
          type="submit"
          className="
            px-5 py-2 rounded-lg font-semibold
            text-white
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
            shadow-lg hover:scale-105 transition
          "
        >
          {editing ? 'Update Expense' : 'Add Expense'}
        </button>

        {editing && (
          <button
            type="button"
            onClick={cancelEdit}
            className="
              px-5 py-2 rounded-lg
              bg-gray-200 text-gray-700
              hover:bg-gray-300 transition
            "
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
