const {Router} = require("express");
const router = Router()
const {userMiddleware} = require('../middleware/user')
const workspaceController = require('../controllers/workspace')

router.get('/workspaces/:id', userMiddleware, workspaceController.getWorkspaceDetails)
router.get('/workspaces/:id/boards', userMiddleware, workspaceController.getBoards)
router.get('/workspaces', userMiddleware, workspaceController.getWorkspaces)
router.post('/workspaces', userMiddleware, workspaceController.createWorkspace)
router.patch('/workspaces/:id', userMiddleware, workspaceController.updateWorkspace)
router.delete('/workspaces/:id', userMiddleware, workspaceController.deleteWorkspace)
router.delete('/workspaces', userMiddleware, workspaceController.deleteWorkspaces)

module.exports =  router