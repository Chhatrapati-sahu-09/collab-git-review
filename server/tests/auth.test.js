const request = require("supertest");
const app = require("../server");
const db = require("./db");

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

const mockUser = {
  name: "Dev User",
  email: "dev@test.com",
  password: "password123",
};

describe("Auth Endpoints", () => {
  it("should register a new user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send(mockUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail registration with duplicate email", async () => {
    await request(app).post("/api/auth/register").send(mockUser);
    const res = await request(app).post("/api/auth/register").send(mockUser);
    expect(res.statusCode).toEqual(400);
  });

  it("should login successfully with correct credentials", async () => {
    await request(app).post("/api/auth/register").send(mockUser);
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: mockUser.password });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail login with bad password", async () => {
    await request(app).post("/api/auth/register").send(mockUser);
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: "wrong" });
    expect(res.statusCode).toEqual(401);
  });
});
