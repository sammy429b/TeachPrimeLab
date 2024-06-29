import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
dotenv.config();


// JWT Token generation
export function JWTsign(payload: number): string | null {
    const JWT_SECRET_KEY = process.env.SECRET_KEY;

    if (!JWT_SECRET_KEY) {
        console.error('JWT Secret Key is missing');
        return null;
    }

    try {
        const token = jwt.sign({ id: payload }, JWT_SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });
        console.log(token)
        return token;
    } catch (error) {
        console.error('Error signing JWT:', error);
        return null;
    }
}

// JWT Token verification
export function JWTverify(req: Request, res: Response, next: NextFunction): void {
    const cookie = req.cookies;
    const JWT_SECRET_KEY = process.env.SECRET_KEY;

    if (!JWT_SECRET_KEY) {
        console.error('JWT Secret Key is missing');
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    if (!cookie) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = cookie.token;

    if (!token) {
        res.status(401).json({ message: "Unauthorized: token expired" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        console.log(decoded);
        const id = (decoded as { id: number }).id;
        const user = User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        next();
    } catch (error) {
        console.error('Error verifying JWT:', error);
        res.status(401).json({ message: "Unauthorized" });
    }
}
