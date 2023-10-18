import React, { useState, useEffect } from 'react'
import './Tasks.css'
import Button from '../../components/Button/Button'
import InputText from '../../components/InputText/InputText'
import TodoEmailList from '../../components/TodoEmailList'
import { db } from '../../firebase/firebase'
import { useParams } from 'react-router-dom'
import {
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const { id } = useParams()

  useEffect(() => {
    const todoCollectionRef = doc(db, 'todo', id)

    const unsubscribe = onSnapshot(todoCollectionRef, (querySnapshot) => {
      console.log(querySnapshot.data())
      setTasks(querySnapshot.data().tasks)
    })

    return unsubscribe
  }, [id])

  const addTask = async () => {
    setNewTask('')

    const myTask = {
      name: newTask,
      completed: false,
      id: Date.now(),
    }

    const myNewTasks = tasks
    myNewTasks.push(myTask)
    setTasks(myNewTasks)
    const docRef = doc(db, 'todo', id)
    await updateDoc(docRef, { tasks: myNewTasks })
  }

  const deleteTask = async (taskId) => {
    const myNewTasks = tasks

    const dropTab = myNewTasks.filter((myNewTask) => myNewTask.id !== taskId)
    setTasks(dropTab)
    const docRef = doc(db, 'todo', id)
    await updateDoc(docRef, { tasks: dropTab })
  }

  const toggleTaskCompletion = async (taskId) => {
    const updatedTask = [...tasks]
    const taskToUpdate = updatedTask.find((task) => task.id === taskId)

    if (taskToUpdate) {
      taskToUpdate.completed = !taskToUpdate.completed
      setTasks(updatedTask)
      const docRef = doc(db, 'todo', id)
      await updateDoc(docRef, { tasks: updatedTask })
    }
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

          <Button label="ADD TASK" handleClick={addTask} variant="primary" />
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

        <ul className="todoUl">
          {filteredTasks.map((task) => (
            <li className="task" key={task.id}>
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.name}
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
        <TodoEmailList />
      </div>
    </>
  )
}
