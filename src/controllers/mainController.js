const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render('index')
	},
	search: (req, res) => {
		let busqueda = req.query.search.toLowerCase();
		let productos = products.filter( producto => producto.name == busqueda)
		res.render('results', {
			productos,
			busqueda
		})
	}
};

module.exports = controller;
