// src/routes/entryRoutes.ts
import { Router } from "express";
import { EntryController } from "../controller/entry.controller";

const router = Router();

// Route to create an entry
router.post("/create", EntryController.createEntry);

// Route to get all entries
router.get("/", EntryController.getAllEntries);

// Route to get a single entry by ID
router.get("/:id", EntryController.getEntryById);

// Route to update an entry by ID
router.put("/:id", EntryController.updateEntry);

// Route to delete an entry by ID
router.delete("/:id", EntryController.deleteEntry);

// Route to get analytics
router.get("/analytics/:userId", EntryController.getDashboardAnalytics);


export default router;
