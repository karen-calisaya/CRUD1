const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const writeJSON = (dataBase) => {
	fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify( dataBase), 'utf-8')
}

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {
			title: 'Todos los productos',
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find( product => product.id == req.params.id)
		res.render('detail', {
			product,
			toThousand
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
		/* ahora traemos lo que viene por el formulario */
		let nuevoProducto = {
			...req.body, /* express operator: taeme todas la propiedades del objeto req.body y asignalas nuevamente a alos valores que vineen por el formulario*/
			id: lastId + 1,
			image: req.file ? req.file.filename : "default-image.png",			
		}
		/* cargamos la nuevo producto al array */
		products.push(nuevoProducto)
		/* sobreescribimos el json */
		writeJSON(products)    /* ................... */
		/* redireccionamos a la vista  de productos*/
		res.redirect('/products')
	},

	// Update - Busca el producto a editar y me trae los cambios a editar
	edit: (req, res) => {
		let productId = +req.params.id; /* capturamos id y con + lo pasamos a string */
		let product = products.find(product => product.id === productId)
		res.render('product-edit-form', {
			product
		})
	},

	// Update - Guarda datos editados
	update: (req, res) => {
		let productId = +req.params.id; /* paso todos los datos de mi baste de datos */
		products.forEach(product => {
			if(product.id === productId){
				product.name = req.body.name
				product.price = req.body.price
				product.discount = req.body.discount
				product.category = req.body.category
				product.description = req.body.description
			}
		}) 
		/* products = products.map(
			product => 
			product.id === productId ?
			{id: product.id, ...req.body, image: product.image} : 
			product
		)
	/* 	const {name, price, discount, category, description} = req.body;
		products.forEach(product => {
			if(product.id === productId){
				product.name = name
				product.price = price
				product.discount = discount
				product.category = category
				product.description = description
			}
		}) */
 
		/* escribir el json */
		writeJSON(products);
		/* redirecciono */
		/* res.send(`Modificaste el producto ${req.body.name}`) */
		res.redirect('/products'); 
	},

	// Delete - Borra productos en db
	destroy : (req, res) => {
		let productId = +req.params.id;
		products.forEach(product => {
			if(product.id === productId){
				let indiceProductoABorrar = products.indexOf(product);
				products.splice(indiceProductoABorrar, 1);
			}
		})
		/* hay que sobreescribir el json */
		writeJSON(products);
		res.redirect('/products');
	}
};

/* id del producto no es lo mismo que la posicion dentro del array.
Por eso uso indexOf para buscar en que indice esta el producto que deseo
borrar */

module.exports = controller;