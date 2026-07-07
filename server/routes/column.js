const {Router} = require("express")
const router = Router()

const {userMiddleware} = require('../middleware/user')
const columnController = require('../controllers/column')


router.get('/boards/:id/columns', userMiddleware, columnController.getColumns)
router.post('/boards/:id/columns', userMiddleware, columnController.createColumns)
router.delete('/boards/:id/columns', userMiddleware, columnController.deleteColumns)

router.post('/boards/:id/column', userMiddleware, columnController.createColumn)

router.get('/columns/:id', userMiddleware, columnController.getColumnDetails)
router.patch('/columns/:id', userMiddleware, columnController.updateColumn)
router.delete('/columns/:id', userMiddleware, columnController.deleteColumn)


module.exports=router