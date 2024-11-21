import { User } from "../entities/user";
import { AppDataSource } from "../libs/db";
import AuthService from "../services/authService";
const appUsers = [
    {
        username: "Kyle",
        password: "Kyle@9A7C23",
    },
    {
        username: "Andrew",
        password: "Andrew@A32D4F",
    },
    {
        username: "Jeff",
        password: "Jeff@BA5C67",
    },
    {
        username: "Rick",
        password: "Rick@CDE8F1",
    },
    {
        username: "Lev",
        password: "Lev@FEDCBA",
    },
    {
        username: "Alex",
        password: "Alex@IJKLMO",
    },
    {
        username: "Hank",
        password: "Hank@MNOPQR",
    },
    {
        username: "Raj",
        password: "Raj@STUVWX",
    },
    {
        username: "Baker",
        password: "Baker@67890A",
    },
    {
        username: "Ezra",
        password: "Ezra@BCDEFG3",
    },
];
const main = async () => {
    try {
        const user = AppDataSource.getRepository(User);
        const promises = appUsers.map(async (usr) => {
            const hashedPassword = await AuthService.createHash(usr.password);
            await user.save({
                username: usr.username,
                password: hashedPassword,
            });
        });
        await Promise.all(promises);
        console.log(user);
    }
    catch (error) {
        throw error;
    }
};
main()
    .then(() => console.log("Done"))
    .then((err) => {
    console.log(err);
});
//# sourceMappingURL=main.js.map