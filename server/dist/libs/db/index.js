import { DataSource } from "typeorm";
import { URL } from "url";
import { env } from "../../config/env";
import { User } from "../../entities/user";
import { Comment } from "../../entities/comment";
import { Entry } from "../../entities/entry";
const dbUrl = new URL(env.DATABASE_URL);
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");
export const AppDataSource = new DataSource({
    type: "cockroachdb",
    url: dbUrl.toString(),
    ssl: true,
    entities: [User, Comment, Entry],
    extra: {
        options: routingId,
    },
    synchronize: false, // Set to false to avoid auto-syncing schema
    timeTravelQueries: true,
});
//# sourceMappingURL=index.js.map