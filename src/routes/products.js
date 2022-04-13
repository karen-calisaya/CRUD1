// ************ Require's ************
const express = require('express');
const router = express.Router();
const uploadFile = require('../middleware/imageProduct');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail);  

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); /* formulario para agregar producto */

/* aplicar multer */
/* single recibe como parametro el name del inputfile */
router.post('/create', uploadFile.single('image'), productsController.store);  /* envia y guar los datos para agregar producto  */


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update);   


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy);


module.exports = router;
