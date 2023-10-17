import React, { useState, useEffect } from 'react'
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
      const newTaskItem = { id: taskId, text: newTask, completed: false }
      const updatedTasks = [newTaskItem, ...tasks]
      setTasks(updatedTasks)
      setNewTask('')
      saveTasksToLocalStorage(updatedTasks)
    }
  }

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
    saveTasksToLocalStorage(updatedTasks)
  }

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
    saveTasksToLocalStorage(updatedTasks)
  }

  const handleFilterClick = (filterType) => {
    setFilter(filterType)
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

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const getTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }

  useEffect(() => {
    getTasksFromLocalStorage()
  }, [])

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

          <Button label="ADD" handleClick={addTask} variant="primary" />
        </div>

        <div className="filterBtn">
          <Button
            label="Toutes les tâches"
            handleClick={() => handleFilterClick('all')}
            variant={filter === 'all' ? 'primary' : 'secondary'}
          />
          <Button
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            label="Tâches complétées"
            handleClick={() => handleFilterClick('completed')}
          />
          <Button
            variant={filter === 'uncompleted' ? 'primary' : 'secondary'}
            label="Tâches non complétées"
            handleClick={() => handleFilterClick('uncompleted')}
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
              <span className="deleteCheck">
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="checkbox-input"
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <Button
                  variant="primary"
                  label="Supprimer"
                  handleClick={() => deleteTask(task.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
