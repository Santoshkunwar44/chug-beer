import { Comment } from "../entities/comment";
import { AppDataSource } from "../libs/db/index";
export class CommentController {
    // Create a new comment
    static { this.createComment = async (req, res, next) => {
        const { text, userId, entryId } = req.body;
        // You may want to add validation for incoming parameters here.
        if (!text || !userId || !entryId) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        try {
            const commentRepository = AppDataSource.getRepository(Comment);
            const comment = commentRepository.create({
                text,
                userId,
                entry: { id: entryId },
            });
            await commentRepository.save(comment);
            res
                .status(201)
                .json({ message: "Comment created successfully", comment });
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }; }
    // Get all comments for a specific entry
    static { this.getCommentsByEntryId = async (req, res, next) => {
        const { entryId } = req.params;
        // Validate the entryId
        if (!entryId) {
            res.status(400).json({ message: "Entry ID is required" });
            return;
        }
        try {
            const commentRepository = AppDataSource.getRepository(Comment);
            const comments = await commentRepository.find({
                where: { entry: { id: entryId } },
            });
            res.status(200).json(comments);
        }
        catch (error) {
            // Pass error to next middleware
            next(error);
            return;
        }
    }; }
    // Get a single comment by ID
    static { this.getCommentById = async (req, res, next) => {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Comment ID is required" });
            return;
        }
        try {
            const commentRepository = AppDataSource.getRepository(Comment);
            const comment = await commentRepository.findOneBy({ id });
            if (!comment) {
                res.status(404).json({ message: "Comment not found" });
                return;
            }
            res.status(200).json(comment);
        }
        catch (error) {
            next(error);
            return;
        }
    }; }
    // Update a comment by ID
    static { this.updateComment = async (req, res, next) => {
        const { id } = req.params;
        const { text } = req.body;
        if (!id) {
            res.status(400).json({ message: "Comment ID is required" });
            return;
        }
        if (!text) {
            res
                .status(400)
                .json({ message: "Text is required to update the comment" });
            return;
        }
        try {
            const commentRepository = AppDataSource.getRepository(Comment);
            const comment = await commentRepository.findOneBy({ id });
            if (!comment) {
                res.status(404).json({ message: "Comment not found" });
                return;
            }
            comment.text = text; // update the text field
            await commentRepository.save(comment);
            res
                .status(200)
                .json({ message: "Comment updated successfully", comment });
        }
        catch (error) {
            next(error);
            return;
        }
    }; }
    // Delete a comment by ID
    static { this.deleteComment = async (req, res, next) => {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Comment ID is required" });
            return;
        }
        try {
            const commentRepository = AppDataSource.getRepository(Comment);
            const comment = await commentRepository.findOneBy({ id });
            if (!comment) {
                res.status(404).json({ message: "Comment not found" });
                return;
            }
            await commentRepository.remove(comment);
            res.status(200).json({ message: "Comment deleted successfully" });
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }; }
}
//# sourceMappingURL=comment.controller.js.map