const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

const connection = require('./database/database');
connection
  .authenticate()
  .then(() => {
    console.log('MYSQL, CONECTADO');
  }).catch((error) => {
    console.error(error);
  });

const Produto = require('./database/Produto');

app.get('/cadastrar-produto', (req, res) => {
    
    res.render('cadastrar-produto');
});

app.post('/salvar-produto', (req, res) => {
    let nm_produto = req.body.nm_produto;
    let ds_produto = req.body.ds_produto;
    let vl_unitario = req.body.vl_unitario;
    let categoria = req.body.categoria;

    Produto.create({
      nm_produto: nm_produto, 
      ds_produto: ds_produto,
      vl_unitario: vl_unitario,
      categoria: categoria
    }).then(() => {
      res.redirect('/');
    }).catch((error) => {
      console.error(`Ocorreu um erro, ao salvar o produto -  ${error}`);
    });
});

app.get('/', (req, res) => {
    Produto.findAll({
      raw: true, 
      order: [[ 'id' ]],
      where: {categoria: 'pizza'}
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/pizzas', (req, res) => {
    Produto.findAll({
      raw: true, 
      order: [[ 'id' ]],
      where: {categoria: 'pizza'}
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/massas', (req, res) => {
    Produto.findAll({
      raw: true, 
      order: [[ 'id' ]],
      where: {categoria: 'massa'}
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/calzones', (req, res) => {
    Produto.findAll({
      raw: true, 
      order: [[ 'id' ]],
      where: {categoria: 'calzone'}
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/esfihas', (req, res) => {
    Produto.findAll({
      raw: true, 
      order: [[ 'id' ]],
      where: {categoria: 'esfiha'}
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/sobremesas', (req, res) => {
    Produto.findAll({
      raw: true, 
      order: [[ 'id' ]],
      where: {categoria: 'sobremesa'}
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/bebidas', (req, res) => {
    Produto.findAll({
      raw: true, 
      order: [[ 'id' ]],
      where: {categoria: 'bebida'}
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/produto/:id', (req, res) => {
    const {id} = req.params;
    Produto.findAll({
      raw: true, 
      where: {id: id}
    }).then((produto) => {
      res.render('produto', {
        produto: produto
      });
    });
});

app.listen(9000, (erro) => {
    if(erro) {
      console.log('Ops, erro de servidor na porta 9000');
    } else {
      console.log('Servidor rodando : https//localhost:9000');
    }
});