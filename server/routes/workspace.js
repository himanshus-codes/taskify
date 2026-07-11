const {Router} = require("express");
const router = Router()
const {userMiddleware} = require('../middleware/user')
const workspaceController = require('../controllers/workspace')

router.get('/workspace/:id', userMiddleware, workspaceController.getWorkspaceDetails)
router.get('/workspaces', userMiddleware,workspaceController.getWorkspaces )
router.post('/workspace', userMiddleware, workspaceController.createWorkspace)
router.patch('/workspace/:id', userMiddleware, workspaceController.updateWorkspace)
router.delete('/workspace/:id', userMiddleware, workspaceController.deleteWorkspace)
router.delete('/workspaces', userMiddleware, workspaceController.deleteWorkspaces)



module.exports =  router