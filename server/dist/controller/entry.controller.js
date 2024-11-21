import { Entry } from "../entities/entry";
import { AppDataSource } from "../libs/db/index";
export class EntryController {
    // Create a new entry
    static { this.createEntry = async (req, res) => {
        const { title, description, videoUrl } = req.body;
        try {
            const entryRepository = AppDataSource.getRepository(Entry);
            const entry = entryRepository.create({
                title,
                description,
                videoUrl,
            });
            await entryRepository.save(entry);
            res.status(201).json({ message: "Entry created successfully", entry });
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }; }
    // Get all entries
    static { this.getAllEntries = async (_req, res) => {
        try {
            const entryRepository = AppDataSource.getRepository(Entry);
            const entries = await entryRepository.find();
            res.status(200).json(entries);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
            return;
        }
    }; }
    // Get a single entry by ID
    static { this.getEntryById = async (req, res) => {
        const { id } = req.params;
        try {
            const entryRepository = AppDataSource.getRepository(Entry);
            const entry = await entryRepository.findOneBy({ id });
            if (!entry) {
                res.status(404).json({ message: "Entry not found" });
                return;
            }
            res.status(200).json(entry);
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }; }
    // Update an entry by ID
    static { this.updateEntry = async (req, res) => {
        const { id } = req.params;
        const { title, description, videoUrl } = req.body;
        try {
            const entryRepository = AppDataSource.getRepository(Entry);
            const entry = await entryRepository.findOneBy({ id });
            if (!entry) {
                res.status(404).json({ message: "Entry not found" });
                return;
            }
            entry.title = title ?? entry.title;
            entry.description = description ?? entry.description;
            entry.videoUrl = videoUrl ?? entry.videoUrl;
            await entryRepository.save(entry);
            res.status(200).json({ message: "Entry updated successfully", entry });
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }; }
    // Delete an entry by ID
    static { this.deleteEntry = async (req, res) => {
        const { id } = req.params;
        try {
            const entryRepository = AppDataSource.getRepository(Entry);
            const entry = await entryRepository.findOneBy({ id });
            if (!entry) {
                res.status(404).json({ message: "Entry not found" });
                return;
            }
            await entryRepository.remove(entry);
            res.status(200).json({ message: "Entry deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }; }
    static { this.getEntriesByUserId = async (req, res) => {
        const { userId } = req.params;
        try {
            const entryRepository = AppDataSource.getRepository(Entry);
            const entries = await entryRepository.find({ where: { userId } });
            res.status(200).json(entries);
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }; }
}
//# sourceMappingURL=entry.controller.js.map