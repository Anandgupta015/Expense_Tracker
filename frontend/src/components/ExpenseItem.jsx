import React from 'react';

export default function ExpenseItem({ exp, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded shadow hover:shadow-md transition">
      <div>
        <div className="font-semibold text-gray-800">{exp.title}</div>
        <div className="text-sm text-gray-500">
          {exp.location ? `${exp.location} • ` : ''}
          {exp.date} {exp.time ? `• ${exp.time}` : ''}
        </div>
        {exp.user && (
          <div className="text-xs text-gray-400 mt-1">
            Added by: {exp.user.name} ({exp.user.email})
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="font-medium text-indigo-600">₹{exp.cost}</div>
        <button onClick={() => onEdit(exp)} className="px-2 py-1 text-sm border rounded hover:bg-gray-100 transition">
          Edit
        </button>
        <button onClick={() => onDelete(exp._id)} className="px-2 py-1 text-sm border rounded hover:bg-red-100 transition">
          Delete
        </button>
      </div>
    </div>
  );
}
