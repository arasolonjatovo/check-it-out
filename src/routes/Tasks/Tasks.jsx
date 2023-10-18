import React, { useState, useEffect } from 'react'
import './Tasks.css'
import Button from '../../components/Button/Button'
import InputText from '../../components/InputText/InputText'
import TodoEmailList from '../../components/TodoEmailList'
import { db } from '../../firebase/firebase'
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const tasksCollection = collection(db, 'visu-tasks')
    const unsubscribe = onSnapshot(tasksCollection, (querySnapshot) => {
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Utilisez l'ID du document comme identifiant unique
        ...doc.data(),
      }))
      setTasks(tasksData)
    })

    return unsubscribe
  }, [])

  const addTask = async () => {
    if (newTask) {
      try {
        const taskData = {
          text: newTask,
          completed: false,
          created_at: serverTimestamp(),
        }
        const docRef = await addDoc(collection(db, 'visu-tasks'), taskData)
        const taskId = docRef.id // Récupère l'ID généré pour la tâche
        setTasks([...tasks, { id: taskId, ...taskData }])
        setNewTask('')
      } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche :", error)
      }
    }
  }

  const deleteTask = (taskId) => {
    // Supprime la tâche de la base de données
    try {

      deleteDoc(doc(db, 'visu-tasks', taskId))

    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error)
    }

    // Mettre à jour la liste de tâches locale
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
  }

  const toggleTaskCompletion = async (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newCompletionStatus = !task.completed
        try {
          updateDoc(doc(db, 'visu-tasks', taskId), {
            completed: newCompletionStatus,
          })
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la tâche :', error)
        }
        return { ...task, completed: newCompletionStatus }
      }
      return task
    })
    setTasks(updatedTasks)
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
        <TodoEmailList />
      </div>
    </>
  )
}
