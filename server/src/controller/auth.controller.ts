// src/controller/authController.ts
import { NextFunction, Request, Response } from "express";
import User from "../entities/user"; // Mongoose model for User
import AuthService from "../services/authService";

export class AuthController {
  static register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Validate request data
    if (!(username && password)) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      // Hash password
      const hashedPassword = AuthService.createHash(password);

      // Create new user
      const user = new User({
        username,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!(username && password)) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      // Find the user by username
      const user = await User.findOne({ username }).lean();
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      // Compare password with stored hash
      const isPasswordValid = AuthService.compareHash(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      res.status(200).json({ message: { ...user, lastLoggedIn: Date.now() } });
    } catch (error) {
      next(error);
    }
  };
  static getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
      const user = await User.findById(userId).lean();
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({
        message: user,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };
}
