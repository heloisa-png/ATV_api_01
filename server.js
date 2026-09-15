const express = require('express');
const pool = require('./db');
const app = express();

// porta
const port = 3000;

//importação do modulo cors 
const cors = ('cors');
app.use(express.json());

//habilita o cors
app.use(cors());  

// GET buscar todos os produtos 
app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtos';

    pool.query(sql, (error, resultado) => {
        console.log(resultado.rows);

        res.json(resultado.rows);
    });
});


// GET busca por ID
app.get('/produtos/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM produtos WHERE id_produto = $1';
     const valores = id

    pool.query(sql, id, (erro, resultado)=>{
        if( resultado === 0){
            return res.status(404).json({ mensagem: 'produto não encontrado.'});
        }
        res.json(resultado.rows);
    });
});


// POST adicionar produto 
app.post('/produtos', (req, res) => {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const descricao = req.body.descricao;
    
    //puxa do banco de dados
    const sql = 'insert into produtos (nome, preco, descricao) values (1$, 2$, 3$)';
    const valores = [nome, preco, descricao];

    //mostra tbm o erro caso tenha 
    pool.query(sql, valores, (erro, resultado)=>{
        res.json(resultado);
    });
});


// Deletar ID produto
app.delete('/produtos/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM produtos WHERE id = $1';

    const valores = [id];

    pool.query(sql, valores, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ mensagem: 'Erro ao deletar produto' });
        }
        res.json({ mensagem: 'Produto deletado com sucesso' });
    });
});

//falta bbaixar as dependencias tirando express.

app.listen(port, () => {
    console.log(`servidor rodando com sucesso em http://localhost:${port}`);
});