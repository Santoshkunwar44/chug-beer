// src/controller/entryController.ts
import { Request, Response } from "express";
import Entry from "../entities/entry"; // Adjust this import to the location of your Mongoose model
import mongoose from "mongoose";
import User from "../entities/user";

export class EntryController {
  // Create a new entry
  static createEntry = async (req: Request, res: Response) => {
    const { title, description, videoUrl, userId } = req.body; // userId might be needed for the entry creation
    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).json({ error: "Invalid userId format" });
      return;
    }
    try {
      const entry = new Entry({
        title,
        description,
        videoUrl,
        userId: new mongoose.Types.ObjectId(userId), // Assuming you want to associate this entry with a user
      });

      await entry.save();

      res.status(201).json({ message: "Entry created successfully", entry });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  // Get all entries
  static getAllEntries = async (req: Request, res: Response) => {
    let { ownerId, excludeId, search } = req.query;

    const page = +(req.query.page as string) || 1;
    const perPage = +(req.query.perPage as string) || 6;
    const skip = (page - 1) * perPage;

    try {
      const query: any = {};

      // Handle ownerId and excludeId conditions
      if (ownerId) {
        query.userId = ownerId;
      }

      if (excludeId) {
        query.userId = { $ne: excludeId };
      }

      // Handle search query for title and description using regex (case-insensitive search)
      if (search && typeof search === "string") {
        const searchRegex = new RegExp(search, "i"); // 'i' for case-insensitive
        query.$or = [
          { title: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
        ];
      }

      // Query the database with the built query object
      const total = await Entry.countDocuments(query);
      const entries = await Entry.find(query)
        .skip(skip)
        .limit(perPage)
        .populate("userId", {
          username: 1,
          avatar: 1,
        });

      res.status(200).json({
        message: entries,
        success: true,
        pageDetails: {
          perPage: perPage,
          currentPage: page,
          total: total,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  // Get a single entry by ID
  static getEntryById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const entry = await Entry.findById(id).populate("userId");
      if (!entry) {
        res.status(404).json({ message: "Entry not found" });
        return;
      }

      res.status(200).json(entry);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  // Update an entry by ID
  static updateEntry = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, videoUrl } = req.body;

    try {
      const entry = await Entry.findById(id);
      if (!entry) {
        res.status(404).json({ message: "Entry not found" });
        return;
      }

      entry.title = title ?? entry.title;
      entry.description = description ?? entry.description;
      entry.videoUrl = videoUrl ?? entry.videoUrl;

      await entry.save();

      res.status(200).json({ message: "Entry updated successfully", entry });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  // Delete an entry by ID
  static deleteEntry = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const entry = await Entry.findById(id);
      if (!entry) {
        res.status(404).json({ message: "Entry not found" });
        return;
      }

      await Entry.deleteOne({ _id: id });

      res.status(200).json({ message: "Entry deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  // Get all entries by userId
  static getEntriesByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const entries = await Entry.find({ userId });
      res.status(200).json(entries);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  static getDashboardAnalytics = async (req: Request, res: Response) => {
    try {
      const userExist = await User.findById(req.params.userId);

      if (!userExist) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const uploadPendingCount = await Entry.countDocuments({
        userId: req.params.userId,
        videoUrl: {
          $exists: false,
        },
      });

      const myTotalEntries = await Entry.countDocuments({
        userId: req.params.userId,
      });

      res.status(200).json({
        videoPendingCount: uploadPendingCount,
        totalEntryCount: myTotalEntries,
        oweCount: userExist.owe || 0,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      return;
    }
  };
}
