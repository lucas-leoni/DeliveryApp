const Sequelize = require('sequelize');
const connection = require('./database');

const Produto = connection.define('produto', {
    nm_produto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ds_produto: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    vl_unitario: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Produto.sync({ force: false }).then(() => {});
module.exports = Produto;