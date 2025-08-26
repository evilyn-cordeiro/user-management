import { Router } from "express";
import { createUser, deleteUser, getUsers, login, updateUser } from "../controllers/users/users.controller";
import { authenticate } from "../middlewares/auth.middlewares";

const userRoutes = Router();

userRoutes.post("/auth/login", login);

userRoutes.post("/users", authenticate, createUser);
userRoutes.get("/users", authenticate, getUsers);
userRoutes.put("/users/:id", authenticate, updateUser);
userRoutes.delete("/users/:id", authenticate, deleteUser);

export default userRoutes;
