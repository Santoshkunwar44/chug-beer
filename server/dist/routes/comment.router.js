import { Router } from "express";
import { CommentController } from "../controller/comment.controller"; // Adjust the path accordingly
const router = Router();
// Define routes
router.post("/comments", CommentController.createComment);
router.get("/comments/entry/:entryId", CommentController.getCommentsByEntryId);
router.get("/comments/:id", CommentController.getCommentById);
router.put("/comments/:id", CommentController.updateComment);
router.delete("/comments/:id", CommentController.deleteComment);
export default router;
//# sourceMappingURL=comment.router.js.map