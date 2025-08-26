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
    password: bcrypt.hashSync("admin123", 10)
  }
];

let nextId = 2;

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, "segredo123", {
    expiresIn: "1h"
  });

  res.json({ token });
};

export const createUser = (req: Request, res: Response) => {
  const { email, name, type, password } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "E-mail já cadastrado" });
  }

  const newUser: User = {
    id: nextId++,
    email,
    name,
    type,
    password: bcrypt.hashSync(password, 10)
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

export const getUsers = (_: Request, res: Response) => {
  res.json(users.map(u => ({ ...u, password: undefined })));
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name, type, password } = req.body;

  const user = users.find(u => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  if (email && email !== user.email && users.find(u => u.email === email)) {
    return res.status(400).json({ message: "E-mail já cadastrado" });
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
  users = users.filter(u => u.id !== parseInt(id));
  res.status(204).send();
};
