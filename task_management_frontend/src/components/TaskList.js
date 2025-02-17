import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/taskService';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState(''); // Default: Show all
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [filterStatus, tasks]);

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

    const applyFilter = () => {
        if (filterStatus === '') {
            setFilteredTasks(tasks); // Show all if no filter selected
        } else {
            const filtered = tasks.filter(task => task.status === filterStatus);
            setFilteredTasks(filtered);
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

    if (loading) return <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>;

    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Task List</h2>
            
            {/* Filter Dropdown */}
            <div className="mb-3">
                <label htmlFor="filterStatus" className="form-label">Filter by Status:</label>
                <select
                    id="filterStatus"
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {filteredTasks.length === 0 ? (
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
                        {filteredTasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                                <td>{task.due_date.split('T')[0]}</td> {/* Format the date */}
                                <td>
                                    <button className="btn btn-primary" onClick={() => alert('Edit functionality not implemented yet')}>Edit</button>
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
