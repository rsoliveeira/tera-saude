import request from "supertest";
import app from "../../src/app";

describe("Auth Integration", () => {
  it("deve bloquear acesso sem token", async () => {
    const response = await request(app).get("/pacientes");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      mensagem: "Token não informado",
    });
  });
});
