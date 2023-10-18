import React, { useState, useEffect } from 'react'
import './Tasks.css'
import Button from '../../components/Button/Button'
import InputText from '../../components/InputText/InputText'
import TodoEmailList from '../../components/TodoEmailList'
import { db } from '../../firebase/firebase'
import { useParams } from 'react-router-dom'
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const { id } = useParams()
  const todoId = id

  useEffect(() => {
    const todoCollectionRef = collection(db, 'todo', todoId, 'tasks')

    const unsubscribe = onSnapshot(todoCollectionRef, (querySnapshot) => {
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Utilisez l'ID du document comme identifiant unique
        ...doc.data(),
      }))
      setTasks(tasksData)
    })

    return unsubscribe
  }, [todoId])

  const addTask = async () => {
    if (newTask) {
      try {
        const taskData = {
          text: newTask,
          completed: false,
          created_at: serverTimestamp(),
        }

        // Construction du chemin vers la sous-collection de la "todo" spécifique
        // Utilisez l'ID de la "todo" récupéré via useParams()
        const todoCollectionRef = collection(db, 'todo', todoId, 'tasks')

        // Ajoutez la tâche à la sous-collection
        await addDoc(todoCollectionRef, taskData)

        // Mettez à jour l'état local si nécessaire
        setTasks([...tasks, taskData])
        setNewTask('')
      } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche :", error)
      }
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const taskDocRef = doc(db, 'todo', todoId, 'tasks', taskId)
      await deleteDoc(taskDocRef)

      // Mettre à jour la liste de tâches locale en excluant la tâche supprimée
      const updatedTasks = tasks.filter((task) => task.id !== taskId)
      setTasks(updatedTasks)
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error)
    }
  }

  const toggleTaskCompletion = async (taskId) => {
    try {
      // Récupérer la référence du document de la tâche spécifique
      const taskDocRef = doc(db, 'todo', todoId, 'tasks', taskId)

      // Récupérer le document actuel pour obtenir le statut de complétion
      const taskDoc = await getDoc(taskDocRef)
      if (taskDoc.exists()) {
        const currentStatus = taskDoc.data().completed

        // Calculer le nouveau statut de complétion
        const newCompletionStatus = !currentStatus

        // Mettre à jour le document de la tâche avec le nouveau statut
        await updateDoc(taskDocRef, {
          completed: newCompletionStatus,
        })

        // Mettre à jour la liste de tâches locale avec le nouveau statut
        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed: newCompletionStatus }
          }
          return task
        })

        setTasks(updatedTasks)
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error)
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
