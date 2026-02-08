import React from 'react'

export default function ExpenseItem({ exp, onEdit, onDelete }) {
  return (
    <div
      className="
        flex items-center justify-between
        p-4 rounded-2xl
        bg-white/80 backdrop-blur
        border border-gray-200
        shadow-sm hover:shadow-xl
        transition-all duration-300
        relative overflow-hidden
      "
    >
      {/* Left color accent */}
      <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-pink-500" />

      {/* Info */}
      <div className="pl-3">
        <div className="font-semibold text-gray-800 text-lg">
          {exp.title}
        </div>

        <div className="text-sm text-gray-500 mt-0.5">
          {exp.location && (
            <span className="text-indigo-500 font-medium">
              {exp.location}
            </span>
          )}
          {exp.location && ' • '}
          {exp.date}
          {exp.time && ` • ${exp.time}`}
        </div>

        {exp.user && (
          <div className="text-xs text-gray-400 mt-1">
            Added by <span className="font-medium">{exp.user.name}</span>
            {' '}({exp.user.email})
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <div className="text-lg font-bold text-indigo-600">
          ₹{exp.cost}
        </div>

        <button
          onClick={() => onEdit(exp)}
          className="
            px-3 py-1.5 rounded-lg text-sm font-medium
            border border-indigo-300 text-indigo-600
            hover:bg-indigo-50 hover:scale-105
            transition
          "
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(exp._id)}
          className="
            px-3 py-1.5 rounded-lg text-sm font-medium
            border border-red-300 text-red-600
            hover:bg-red-50 hover:scale-105
            transition
          "
        >
          Delete
        </button>
      </div>
    </div>
  )
}
