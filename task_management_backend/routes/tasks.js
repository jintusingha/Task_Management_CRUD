const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET /tasks → Fetch all tasks
router.get('/', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// POST /tasks → Add a new task
router.post('/', (req, res) => {
    const { title, description, status, due_date } = req.body;
    const sql = 'INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, description, status, due_date], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Task added', id: result.insertId });
    });
});

// PUT /tasks/:id → Update task details
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;
    const sql = 'UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?';
    db.query(sql, [title, description, status, due_date, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Task updated' });
    });
});

// DELETE /tasks/:id → Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Task deleted' });
    });
});




module.exports = router;
