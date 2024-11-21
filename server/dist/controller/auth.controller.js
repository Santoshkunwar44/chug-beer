import { User } from "../entities/user";
import { AppDataSource } from "../libs/db/index";
import AuthService from "../services/authService";
export class AuthController {
    static { this.register = async (req, res) => {
        const { username, password } = req.body;
        // Validate request data
        if (!(username && password)) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        try {
            const userRepository = AppDataSource.getRepository(User);
            // Check if user already exists
            const existingUser = await userRepository.find({ where: { username } });
            if (existingUser) {
                res.status(400).json({ message: "User already exists" });
                return;
            }
            // Hash password
            const hashedPassword = AuthService.createHash(password);
            // Create new user
            const user = userRepository.create({
                username,
                password: hashedPassword,
            });
            await userRepository.save(user);
            res.status(201).json({ message: "User registered successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }; }
    static { this.login = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            if (!(username && password)) {
                res.status(400).json({ message: "All fields are required" });
                return;
            }
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { username } });
            if (!user) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }
            const isPasswordValid = AuthService.compareHash(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }
            res.status(200).json({ message: "Login successful" });
        }
        catch (error) {
            next(error);
        }
    }; }
}
//# sourceMappingURL=auth.controller.js.map