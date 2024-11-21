// src/routes/entryRoutes.ts
import { Router } from "express";
import { EntryController } from "../controller/entry.controller";
const router = Router();
// Route to create an entry
router.post("/entries", EntryController.createEntry);
// Route to get all entries
router.get("/entries", EntryController.getAllEntries);
// Route to get a single entry by ID
router.get("/entries/:id", EntryController.getEntryById);
// Route to update an entry by ID
router.put("/entries/:id", EntryController.updateEntry);
// Route to delete an entry by ID
router.delete("/entries/:id", EntryController.deleteEntry);
export default router;
//# sourceMappingURL=entry.router.js.map