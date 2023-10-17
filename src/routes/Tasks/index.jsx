import React, { useState } from 'react'
import './Tasks.css'
import Button from '../../components/Button/Button'
import InputText from '../../components/InputText/InputText'

export default function Gestion() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')

  const addTask = () => {
    if (newTask) {
      const taskId = new Date().getTime()
      setTasks([{ id: taskId, text: newTask, completed: false }, ...tasks])
      setNewTask('')
    }
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
  }

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed
    } else if (filter === 'uncompleted') {
      return !task.completed
    } else {
      return true
    }
  })

  return (
    <>
      <div className="todo">
        <h1>MY TO-DO</h1>

        <div className="addTask">
          <InputText
            desc="New task"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <Button label="ADD" handleClick={addTask} variant="second" />
        </div>

        <div className="filterBtn">
          <Button
            label="Toutes les tâches"
            handleClick={() => setFilter('all')}
          />
          <Button
            label="Tâches complétées"
            handleClick={() => setFilter('completed')}
          />
          <Button
            label="Tâches non complétées"
            handleClick={() => setFilter('uncompleted')}
          />
        </div>

        <ul>
          {filteredTasks.map((task) => (
            <li className="task" key={task.id}>
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.text}
              </span>
              <input
                type="checkbox"
                {...label}
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <Button
                label="Supprimer"
                handleClick={() => deleteTask(task.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
