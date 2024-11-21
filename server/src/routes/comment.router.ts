import { Router } from "express";
import { CommentController } from "../controller/comment.controller"; // Adjust the path accordingly

const router = Router();

// Define routes
router.post("/create", CommentController.createComment);
router.get("/entry/:entryId", CommentController.getCommentsByEntryId);
router.get("/:id", CommentController.getCommentById);
router.put("/:id", CommentController.updateComment);
router.delete("/:id", CommentController.deleteComment);

export default router;
