import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/taskService';

const TaskList = ({ onEdit }) => {  // Accept onEdit as a prop
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError('Failed to fetch tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            loadTasks(); // Reload tasks after deletion
        } catch (err) {
            setError('Failed to delete task');
            console.error(err);
        }
    };

    const handleEdit = (task) => {
        onEdit(task); // Call the onEdit function passed from App.js
    };

    if (loading) return <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>;

    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Task List</h2>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                                <td>{task.due_date.split('T')[0]}</td> {/* Format the date */}
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleEdit(task)}>Edit</button>
                                    <button className="btn btn-danger ml-2" onClick={() => handleDelete(task.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TaskList;
