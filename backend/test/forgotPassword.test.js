// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");

describe("POST /api/v1/auth/login/forgot", () => {
    test("It responds with a message to recover password", async () => {
      const response = await request(app).post("/api/v1/auth/login/forgot").send({
        email: "test@test.fr",
      });

      const forgot = JSON.parse(response.body);
      
      console.log(response.statusCode);
      
      expect(forgot).toHaveProperty("email");
      expect(response.statusCode).toBe(201);
    });
});