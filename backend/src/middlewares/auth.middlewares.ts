import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, "segredo123", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    (req as any).user = decoded;
    next();
  });
};
