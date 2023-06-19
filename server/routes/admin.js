const router = require('express').Router();
const AdminController = require('../controllers/adminController')
const authentication = require('../middlewares/authentication')

router.post("/login", AdminController.login);

router.use(authentication);

router.get("/products", AdminController.productList);

router.post("/products/add", AdminController.addProduct);

router.put("/products/:productId/edit", AdminController.updateProduct);

router.delete("/products/:productId/delete", AdminController.deleteProduct);

router.get("/categories", AdminController.categoryList);

router.post("/categories/add", AdminController.addCategory);

router.put("/categories/:categoryId/edit", AdminController.updateCategory);

router.delete("/categories/:categoryId/delete", AdminController.deleteCategory);

router.post("/add-admin", AdminController.addAdmin);

module.exports = router