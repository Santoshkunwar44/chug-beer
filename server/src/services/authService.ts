import bcrypt from "bcryptjs";

class AuthService {
  static createHash = (text: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(text, salt);
    return hash;
  };
  static compareHash = (text: string, hash: string) => {
    const compare = bcrypt.compareSync(text, hash);
    return compare;
  };
}

export default AuthService;
