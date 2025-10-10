import React from 'react'


export default function Header(){
return (
<header className="flex items-center justify-between">
<div>
<h1 className="text-2xl md:text-3xl font-bold">Expense Tracker</h1>
<p className="text-sm text-gray-500">Track your expenses quickly and easily</p>
</div>
<div className="text-right text-sm text-gray-600">Powered by MERN + Tailwind</div>
</header>
)
}