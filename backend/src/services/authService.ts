import User, { User as IUser } from "../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET!; // Use a secure secret in a real application

export class AuthService {
  public async register(
    username: string,
    password: string,
    isAdmin: boolean
  ): Promise<IUser> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword, isAdmin });
      return await user.save();
    } catch (error) {
      console.log(error);
      throw new Error("Error during user registration");
    }
  }

  public async login(
    username: string,
    password: string
  ): Promise<{
    user: { isAdmin: boolean; username: string };
    token: string;
  } | null> {
    try {
      const user = await User.findOne({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
        const { username, isAdmin } = user;
        return { user: { isAdmin, username }, token };
      }
      return null;
    } catch (error) {
      throw new Error("Error during user login");
    }
  }

  public verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
