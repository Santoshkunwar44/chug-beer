import { config } from "dotenv";
config({ path: "../../.env" });
export const env = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
};
//# sourceMappingURL=env.js.map