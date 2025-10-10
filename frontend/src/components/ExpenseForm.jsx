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

    const expenseData = { ...form, user: user._id } // ✅ send user ID

    if (editing) {
      onUpdate(editing._id, expenseData)
    } else {
      onAdd(expenseData)
    }

    setForm(empty)
  }

  const cancelEdit = () => {
    setEditing(null)
    setForm(empty)
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded-xl shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="input"
        />
        <input
          name="cost"
          value={form.cost}
          onChange={handleChange}
          placeholder="Cost (number)"
          type="number"
          className="input"
        />
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
          className="input"
        />
        <input
          name="time"
          value={form.time}
          onChange={handleChange}
          type="time"
          className="input"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="input md:col-span-2"
        />
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
        >
          {editing ? 'Update Expense' : 'Add Expense'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={cancelEdit}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
