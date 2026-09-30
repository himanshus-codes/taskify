const { Router } = require("express");

const router = Router();

const { userMiddleware } = require("../middleware/user.js");

const labelController = require("../controllers/label.js");


// Label CRUD Routes

// Create Label for Board
router.post(
    "/boards/:boardId/labels",
    userMiddleware,
    labelController.createLabel
);


// Get All Labels belonging to Board
router.get(
    "/boards/:boardId/labels",
    userMiddleware,
    labelController.getAllLabels
);


// Get Label Details
router.get(
    "/labels/:id",
    userMiddleware,
    labelController.getLabelDetails
);


// Update Label
router.patch(
    "/labels/:id",
    userMiddleware,
    labelController.updateLabel
);


// Delete Label
router.delete(
    "/labels/:id",
    userMiddleware,
    labelController.deleteLabel
);


module.exports = router;