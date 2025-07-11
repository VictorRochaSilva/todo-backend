const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Rota 1: GET /api/tasks → Lista todas as tarefas
router.get('/', async (req, res) => {
    try {
        // 1. Filtros (query params)
        const { completed, dueDateFrom, dueDateTo, search } = req.query;
        const filter = {};

        // Filtro por status (completed)
        if (completed !== undefined) {
            filter.completed = completed === 'true';
        }

        // Filtro por intervalo de datas (dueDate)
        if (dueDateFrom || dueDateTo) {
            filter.dueDate = {};
            if (dueDateFrom) filter.dueDate.$gte = new Date(dueDateFrom);
            if (dueDateTo) filter.dueDate.$lte = new Date(dueDateTo);
        }

        // Filtro por texto (title ou description)
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // 2. Paginação (page, limit)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // 3. Consulta no MongoDB
        const tasks = await Task.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ dueDate: 1 }); // Ordena por dueDate (asc)

        // 4. Contagem total para paginação
        const totalTasks = await Task.countDocuments(filter);

        res.json({
            tasks,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalTasks / limit),
                totalTasks
            }
        });

    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
});

// Rota 2: POST /api/tasks → Cria uma nova tarefa
router.post('/', async (req, res) => {
    const { title, description, dueDate } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Título é obrigatório' });
    }

    try {
        const newTask = new Task({
            title,
            description: description || '',
            dueDate: dueDate || null,
            completed: false
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
});

// Rota 3: PATCH /api/tasks/:id → Atualiza uma tarefa (status ou dados)
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, dueDate, completed },
            { new: true } // Retorna a tarefa atualizada
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
});

// Rota 4: DELETE /api/tasks/:id → Remove uma tarefa
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send(); // Resposta sem conteúdo (sucesso)
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
});

module.exports = router;