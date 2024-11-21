import { Request, Response, NextFunction } from "express"; // Import NextFunction for better error handling
import Comment from "../entities/comment";

export class CommentController {
  // Create a new comment
  static createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { text, userId, entryId } = req.body;

    // You may want to add validation for incoming parameters here.
    if (!text || !userId || !entryId) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    try {
      const comment = await Comment.create({
        text,
        userId,
        entryId,
      });

      res
        .status(201)
        .json({ message: "Comment created successfully", comment });
      return;
    } catch (error) {
      next(error);
      return;
    }
  };

  // Get all comments for a specific entry
  static getCommentsByEntryId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { entryId } = req.params;

    if (!entryId) {
      res.status(400).json({ message: "Entry ID is required" });
      return;
    }

    try {
      const comments = await Comment.find({
        entryId: entryId,
      })
        .populate("userId")
        .populate("entryId");

      res.status(200).json({ message: comments });
    } catch (error) {
      // Pass error to next middleware
      next(error);
      return;
    }
  };

  // Get a single comment by ID
  static getCommentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Comment ID is required" });
      return;
    }

    try {
      const comment = await Comment.findById(id);
      if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }

      res.status(200).json(comment);
    } catch (error) {
      next(error);
      return;
    }
  };

  // Update a comment by ID
  static updateComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
      const comment = await Comment.findById(id);
      if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }

      comment.text = text; // update the text field
      await comment.save();
      res
        .status(200)
        .json({ message: "Comment updated successfully", comment });
    } catch (error) {
      next(error);
      return;
    }
  };

  // Delete a comment by ID
  static deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Comment ID is required" });
      return;
    }

    try {
      const comment = await Comment.findById(id);
      if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }

      await Comment.findByIdAndDelete(id);

      res.status(200).json({ message: "Comment deleted successfully" });
      return;
    } catch (error) {
      next(error);
      return;
    }
  };
}
