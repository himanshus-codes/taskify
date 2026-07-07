const {Router} = require("express")
const router = Router()

const boardController = require('../controllers/board')
const { userMiddleware } = require("../middleware/user")

// kanban dasboard route
router.get('/boards/:id/dashboard', userMiddleware, boardController.getDashboard)

router.post("/boards/board", userMiddleware, boardController.createBoard)

router.get("/boards",userMiddleware, boardController.getBoards)

// redundant route
router.get("/boards/:id", userMiddleware, boardController.getBoard)

router.patch("/boards/:id", userMiddleware, boardController.updateBoard)

router.delete("/boards", userMiddleware, boardController.deleteBoards)
router.delete("/boards/:id", userMiddleware, boardController.deleteBoard)

module.exports = router