import bcrypt from "bcryptjs";
class AuthService {
    static { this.createHash = (text) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync("B4c0//", salt);
        return hash;
    }; }
    static { this.compareHash = (text, hash) => {
        const compare = bcrypt.compareSync(text, hash);
        return compare;
    }; }
}
export default AuthService;
//# sourceMappingURL=authService.js.map