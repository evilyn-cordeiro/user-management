import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../type";

let users: User[] = [
  {
    id: 1,
    email: "admin@sps.com",
    name: "Admin",
    type: "admin",
    password: bcrypt.hashSync("admin123", 10),
  },
];

let nextId = 2;

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, "secret123", {
    expiresIn: "1h",
  });

  res.json({ token });
};

export const createUser = (req: Request, res: Response) => {
  const { email, name, type, password } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Email already registered." });
  }

  const newUser: User = {
    id: nextId++,
    email,
    name,
    type,
    password: bcrypt.hashSync(password, 10),
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

export const getUsers = (_: Request, res: Response) => {
  res.json(users.map((u) => ({ ...u, password: undefined })));
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name, type, password } = req.body;

  const user = users.find((u) => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (email && email !== user.email && users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Email already registered." });
  }

  user.email = email ?? user.email;
  user.name = name ?? user.name;
  user.type = type ?? user.type;
  if (password) {
    user.password = bcrypt.hashSync(password, 10);
  }

  res.json(user);
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  users = users.filter((u) => u.id !== parseInt(id));
  res.status(204).send();
};
