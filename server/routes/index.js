const router = require("express").Router()
const adminRouter = require('./admin')
const clientRouter = require('./client')



router.use('/', adminRouter);

router.use('/pub', clientRouter);


module.exports = router