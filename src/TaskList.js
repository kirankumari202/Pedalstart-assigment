import React, { useState, useEffect } from 'react';
import Task from './Task';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // fetch tasks from API or local storage
    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      setTasks(JSON.parse(tasksFromStorage));
    }
  }, []);

  const handleAddTask = (event) => {
    event.preventDefault();
    const newTaskObject = { ...newTask, id: Date.now() };
    setTasks([...tasks, newTaskObject]);
    setNewTask({ title: '', description: '', dueDate: '' });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      }
      return t;
    });
    setTasks(updatedTasks);
    setEditingTask(null);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const handleDeleteTask = (task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            isEditing={editingTask === task}
            onUpdate={handleUpdateTask}
          />
        ))}
      </ul>
      <form onSubmit={handleAddTask}>
        <label>
          Title:
          <input type="text" value={newTask.title} onChange={(event) => setNewTask({ ...newTask, title: event.target.value })} />
        </label>
        <label>
          Description:
          <textarea value={newTask.description} onChange={(event) => setNewTask({ ...newTask, description: event.target.value })} />
        </label>
        <label>
          Due Date:
          <input type="date" value={newTask.dueDate} onChange={(event) => setNewTask({ ...newTask, dueDate: event.target.value })} />
        </label>
        <button type="submit">Add Task</button>
      </form>
      {editingTask && (
        <form onSubmit={(event) => {
          event.preventDefault();
          handleUpdateTask(editingTask);
        }}>
          <label>
            Title:
            <input type="text" value={editingTask.title} onChange={(event) => setEditingTask({ ...editingTask, title: event.target.value })} />
          </label>
          <label>
            Description:
            <textarea value={editingTask.description} onChange={(event) => setEditingTask({ ...editingTask, description: event.target.value })} />
          </label>
          <label>
            Due Date:
            <input type="date" value={editingTask.dueDate} onChange={(event) => setEditingTask({ ...editingTask, dueDate: event.target.value })} />
          </label>
          <button type="submit">Update Task</button>
        </form>
      )}
    </div>
  );
};

export default TaskList;