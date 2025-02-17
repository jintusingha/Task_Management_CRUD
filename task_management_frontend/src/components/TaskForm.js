import React, { useState, useEffect } from 'react';
import { addTask, updateTask } from '../services/taskService';
import { createTask } from '../services/taskService'; // Correct import

const TaskForm = ({ taskToEdit, onSave }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'Pending',
        due_date: '',
    });

    useEffect(() => {
        if (taskToEdit) {
            setTask({
                title: taskToEdit.title,
                description: taskToEdit.description,
                status: taskToEdit.status,
                due_date: taskToEdit.due_date.split('T')[0], // Format the date
            });
        }
    }, [taskToEdit]);

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (taskToEdit) {
            // Update existing task if editing
            await updateTask(taskToEdit.id, task);
        } else {
            // Create a new task if not editing
            await createTask(task); // Make sure to call createTask here
        }
        onSave(); // Clear form and go back to the task list
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="text-center mb-4">{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Task Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={task.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Task Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={task.description}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Enter task description"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select
                                className="form-select"
                                id="status"
                                name="status"
                                value={task.status}
                                onChange={handleChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="due_date" className="form-label">Due Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="due_date"
                                name="due_date"
                                value={task.due_date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
                            <button type="button" className="btn btn-secondary" onClick={() => onSave()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
