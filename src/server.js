const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://admin:senha123@localhost:27017/todo?authSource=admin');

app.listen(3001, () => console.log('Servidor rodando na porta 3001'));