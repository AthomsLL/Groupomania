// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");

describe("POST /api/v1/auth/signup", () => {
    test("It responds with a new created user", async () => {
      const response = await request(app).post("/api/v1/auth/signup").send({
        email: "pilou@pilou.fr",
        username: "Pilou",
        password: "Piloupilou1"
      });

      const signup = JSON.parse(response.body);
      
      console.log(signup);
      console.log(response.statusCode);
      
      expect(signup).toHaveProperty("email");
      expect(signup.username).toBe("Pilou");
      expect(response.statusCode).toBe(201);
    });
});