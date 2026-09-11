const express = require('express');
const pool = require('./db');

const app = express();
// porta
const port = 3000;

app.use(express.json());

// GET
app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtos';

    pool.query(sql, (error, resultado) => {
        console.log(error);
        console.log(resultado.rows);

        res.json(resultado.rows);
    });
});


// GET POR ID
app.get('/produtos/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM produtos WHERE id_produto = $1';

    pool.query(sql, [id], (error, resultado) => {
        console.log(error);
        console.log(resultado.rows);

        res.json(resultado.rows);
    });
});


// POST
app.post('/produtos', (req, res) => {
    const { nome, preco, descricao } = req.body;

    const sql = `
        INSERT INTO produtos (nome, preco, descricao)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    pool.query(sql, [nome, preco, descricao], (error, resultado) => {
        console.log(error);
        console.log(resultado.rows);

        res.status(201).json(resultado.rows)
    });
});


app.listen(port, () => {
    console.log(`servidor rodando com sucesso em http://localhost:${port}`);
});