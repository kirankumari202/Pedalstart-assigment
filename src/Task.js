import React from 'react';

const Task = ({ task, onEdit, onDelete, isEditing, onUpdate }) => {
  return (
    <li>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      {isEditing ? (
        <button onClick={() => onUpdate(task)}>Update</button>
      ) : (
        <>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default Task;