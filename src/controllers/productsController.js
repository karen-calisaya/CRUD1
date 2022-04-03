const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {
			title: 'Todos los productos',
			products
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find( product => product.id == req.params.id)
		res.render('detail', {
			product
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form', {  /* o ruta podemos renderizar */
			title: 'Formulario de creación'
		})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let lastId = 0;
		products.forEach( product => {
			if(product.id > lastId){
				lastId = product.id
			}
		})
		/* ahora traemos lo que viene por querystring */
		let nuevoProducto = {
			id: lastId + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description
		}
		/* cargamos la nuevo producto al array  */
		products.push(nuevoProducto)
		/* sobreescribimos el json */
		writeJson(products)    /* ................... */
		/* redireccionamos a la vista  de productos*/
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		
	},


	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;