const { Router } = require("express");

const router = Router();

const { userMiddleware } = require("../middleware/user");

const checklistController = require("../controllers/checklist");


// Checklist CRUD

// Create Checklist for Task
router.post(
    "/tasks/:taskId/checklists",
    userMiddleware,
    checklistController.createChecklist
);

// Get All Checklists for Task
router.get(
    "/tasks/:taskId/checklists",
    userMiddleware,
    checklistController.getAllChecklists
);

// Get Checklist Details
router.get(
    "/checklists/:id",
    userMiddleware,
    checklistController.getChecklistDetails
);

// Update Checklist
router.patch(
    "/checklists/:id",
    userMiddleware,
    checklistController.updateChecklist
);

// Delete Checklist
router.delete(
    "/checklists/:id",
    userMiddleware,
    checklistController.deleteChecklist
);


// Checklist Item CRUD

// Add Item
router.post(
    "/checklists/:checklistId/items",
    userMiddleware,
    checklistController.createChecklistItem
);

// Update Item
router.patch(
    "/checklists/:checklistId/items/:itemId",
    userMiddleware,
    checklistController.updateChecklistItem
);

// Delete Item
router.delete(
    "/checklists/:checklistId/items/:itemId",
    userMiddleware,
    checklistController.deleteChecklistItem
);

module.exports = router;