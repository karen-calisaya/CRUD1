const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const writeJSON = (dataBase) => {
	fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify( dataBase), 'utf-8')
}

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
			...req.body,
			id: lastId + 1,			
		}
		/* cargamos la nuevo producto al array  */
		products.push(nuevoProducto)
		/* sobreescribimos el json */
		writeJSON(products)    /* ................... */
		/* redireccionamos a la vista  de productos*/
		res.redirect('/products')
	},

	// Update - Busca el producto a editar y me trae los cambios a editar
	edit: (req, res) => {
		let productId = +req.params.id;
		let product = products.find(product => product.id === productId)
		res.render('product-edit-form', {
			product
		})
	},

	// Update - Guarda datos editados
	update: (req, res) => {
		let productId = +req.params.id;
		products.forEach(product => {
			if(product.id === productId){
				product.name = req.body.name
				product.price = req.body.price
				product.discount = req.body.discount
				product.category = req.body.category
				product.description = req.body.description
			}
		})
		/* escribir el json */
		writeJSON(products);
		/* redirecciono */
		res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;