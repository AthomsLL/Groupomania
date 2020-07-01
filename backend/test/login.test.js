// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");

describe("POST /api/v1/auth/login", () => {
    test("It responds with a successfully login", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "test@test.fr",
        password: "Testtest1"
      });

      const login = JSON.parse(response.body);
      
      console.log(response.statusCode);
      
      expect(login).toHaveProperty("userId");
      expect(response.statusCode).toBe(200);
    });
});