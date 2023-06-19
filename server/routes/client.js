const router = require('express').Router();
const ClientController = require('../controllers/clientController')

router.get("/products", ClientController.readAllProducts);

router.get("/products/:productId", ClientController.readProductDetail);

module.exports = router