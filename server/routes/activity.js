const { Router } = require("express");

const router = Router();

const { userMiddleware } = require("../middleware/user");

const activityController = require("../controllers/activity");


// Get all activity for a task

router.get(
    "/tasks/:taskId/activity",
    userMiddleware,
    activityController.getTaskActivity
);


// Create comment

router.post(
    "/tasks/:taskId/comments",
    userMiddleware,
    activityController.createComment
);


// Update comment

router.patch(
    "/activities/:id/comment",
    userMiddleware,
    activityController.updateComment
);


// Delete comment

router.delete(
    "/activities/:id/comment",
    userMiddleware,
    activityController.deleteComment
);


module.exports = router;