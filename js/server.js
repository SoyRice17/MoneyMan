const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let incomes = [];
let expenses = [];

app.get('/api/incomes', (req, res) => {
    res.json(incomes);
});

app.post('/api/incomes', (req, res) => {
    incomes.push(req.body);
    res.sendStatus(201);
});

app.get('/api/expenses', (req, res) => {
    res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
    expenses.push(req.body);
    res.sendStatus(201);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});