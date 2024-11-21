import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import { AppDataSource } from "./libs/db/index";
// Initialize data source
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})
    .catch((error) => console.log("Error during Data Source initialization:", error));
app.listen(4000, () => {
    console.log("Server running on port 4000");
});
//# sourceMappingURL=index.js.map