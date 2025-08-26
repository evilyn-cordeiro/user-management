import request from "supertest";
import express from "express";
import userRoutes from "../routes/users.routes";

const app = express();
app.use(express.json());
app.use("/", userRoutes);

describe("User API", () => {
  let token: string;
  let createdUserId: string;

  it("deve logar com admin e retornar token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "admin@sps.com", password: "admin123" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("não deve logar com credenciais erradas", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "admin@sps.com", password: "senhaErrada" });

    expect(res.status).toBe(401);
  });

  it("não deve acessar rota sem token", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(401);
  });

  it("deve criar um novo usuário", async () => {
    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "user1@sps.com",
        name: "User Test",
        type: "user",
        password: "123456",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe("user1@sps.com");
    createdUserId = res.body.id;
  });

  it("não deve permitir criar usuário com e-mail duplicado", async () => {
    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "user1@sps.com",
        name: "Outro User",
        type: "user",
        password: "654321",
      });

    expect(res.status).toBe(400);
  });

  it("deve listar os usuários", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("deve editar um usuário existente", async () => {
    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "User Test Editado",
        type: "admin",
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("User Test Editado");
    expect(res.body.type).toBe("admin");
  });

  it("deve excluir um usuário existente", async () => {
    const res = await request(app)
      .delete(`/users/${createdUserId}`)
      .set("Authorization", `Bearer ${token}`);

    expect([200, 204]).toContain(res.status);
  });

  it("não deve encontrar usuário deletado", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    const userStillExists = res.body.find((u: any) => u.id === createdUserId);
    expect(userStillExists).toBeUndefined();
  });
});
