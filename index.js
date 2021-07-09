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

app.get('/', (req, res) => {
    const { Op } = require("sequelize");
    Produto.findAll({
      raw: true, 
      order: [[ 'id', 'DESC' ]],
      where: {
        [Op.or]: [
          { categoria: 'pizza' },
          { categoria: 'pizzas' }
        ]
      }
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/pizzas', (req, res) => {
    const { Op } = require("sequelize");
    Produto.findAll({
      raw: true, 
      order: [[ 'id', 'DESC' ]],
      where: {
        [Op.or]: [
          { categoria: 'pizza' },
          { categoria: 'pizzas' }
        ]
      }
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/massas', (req, res) => {
    const { Op } = require("sequelize");
    Produto.findAll({
      raw: true, 
      order: [[ 'id', 'DESC' ]],
      where: {
        [Op.or]: [
          { categoria: 'massa' },
          { categoria: 'massas' }
        ]
      }
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/calzones', (req, res) => {
    const { Op } = require("sequelize");
    Produto.findAll({
      raw: true, 
      order: [[ 'id', 'DESC' ]],
      where: {
        [Op.or]: [
          { categoria: 'calzone' },
          { categoria: 'calzones' }
        ]
      }
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/esfihas', (req, res) => {
    const { Op } = require("sequelize");
    Produto.findAll({
      raw: true, 
      order: [[ 'id', 'DESC' ]],
      where: {
        [Op.or]: [
          { categoria: 'esfiha' },
          { categoria: 'esfihas' }
        ]
      }
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/sobremesas', (req, res) => {
    const { Op } = require("sequelize");
    Produto.findAll({
      raw: true, 
      order: [[ 'id', 'DESC' ]],
      where: {
        [Op.or]: [
          { categoria: 'sobremesa' },
          { categoria: 'sobremesas' }
        ]
      }
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

app.get('/bebidas', (req, res) => {
    const { Op } = require("sequelize");
    Produto.findAll({
      raw: true, 
      order: [[ 'id', 'DESC' ]],
      where: {
        [Op.or]: [
          { categoria: 'bebida' },
          { categoria: 'bebidas' }
        ]
      }
    }).then((produto) => {
      res.render('index', {
        produto: produto
      });
    });
});

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
    console.error(`Ocorreu um erro ao salvar o produto -  ${error}`);
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

app.get('/produto/:id/atualizar', (req, res) => {
  const {id} = req.params;
  Produto.findAll({
    raw: true, 
    where: {id: id}
  }).then((produto) => {
    res.render('atualizar-produto', {
      produto: produto
    });
  });
});

app.post('/atualizar-produto/:id', (req, res) => {
  const id = req.params.id;
  let att_nm_produto = req.body.att_nm_produto;
  let att_ds_produto = req.body.att_ds_produto;
  let att_vl_unitario = req.body.att_vl_unitario;
  let att_categoria = req.body.att_categoria;
  console.log(`id: ${id}, attValor: ${att_vl_unitario}`);
  Produto.update({
    nm_produto: att_nm_produto, 
    ds_produto: att_ds_produto,
    vl_unitario: att_vl_unitario,
    categoria: att_categoria
  }, {
    where: {id: id}
  }).then(() => {
    res.redirect('/');
  }).catch((error) => {
    console.error(`Ocorreu um erro ao atualizar o produto -  ${error}`);
  });
});

app.get('/deletar-produto/:id', (req, res) => {
  const id = req.params.id;
  Produto.destroy({ 
    where: { id : id } 
  }).then(() => {
    console.log('removi o registro');
    res.redirect('/');
  }).catch((error) => {
    console.log('errorrrr', error);
  });
});

app.listen(9000, (erro) => {
    if(erro) {
      console.log('Ops, erro de servidor na porta 9000');
    } else {
      console.log('Servidor rodando : https//localhost:9000');
    }
});