import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
    const [taskToEdit, setTaskToEdit] = useState(null);

    const handleEdit = (task) => {
        setTaskToEdit(task); // Set the task to be edited
    };

    const handleSave = () => {
        setTaskToEdit(null); // Clear task to edit after saving
    };

    return (
        <div className="App">
            <h1>Task Management</h1>
            <TaskForm taskToEdit={taskToEdit} onSave={handleSave} />
            <TaskList onEdit={handleEdit} />
        </div>
    );
}

export default App;
