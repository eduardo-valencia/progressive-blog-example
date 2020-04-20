import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar bg-primary d-flex justify-content-end">
      <ul className="nav">
        <li className="nav-item">
          <button
            className="btn btn-link text-white"
            data-toggle="modal"
            data-target="#add-task"
          >
            Add Task
          </button>
        </li>
      </ul>
    </nav>
  )
}
