const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/pizzas', (req, res) => {
    res.render('pizzas');
});

app.get('/pedidos', (req, res) => {
    res.render('pedidos');
});

app.get('/realizar-pedido', (req, res) => {
    res.render('realizar-pedido');
});

app.listen(9000, (erro) => {
    if(erro) {
      console.log('Ops, erro de servidor na porta 9000');
    } else {
      console.log('Servidor rodando : https//localhost:9000');
    }
});