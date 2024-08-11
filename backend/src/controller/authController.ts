import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";
import { User } from "../model/userModel";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { username, password, isAdmin } = req.body;
    try {
      const user: User = await this.authService.register(
        username,
        password,
        isAdmin
      );
      res.status(201).json(user);
    } catch (error) {
      next(error); // Propagate error to error handling middleware
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { username, password } = req.body;
    try {
      const result = await this.authService.login(username, password);
      if (result) {
        res.json(result);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      next(error); // Propagate error to error handling middleware
    }
  };
}
