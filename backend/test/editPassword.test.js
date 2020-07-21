// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("PUT /api/v1/users/:id/password", () => {
    test("It responds with a user's password updated", async () => {
      const auth = await tools.auth();

      const response = await request(app).put("/api/v1/users/2/password").set('Authorization', 'Bearer ' + auth.token).send({
            oldPassword: "Testtest2",
            password: "Testtest3"
      });

      const password = JSON.parse(response.body);
      
      console.log(password);
      console.log(password.password);
      console.log(response.statusCode);
      
      expect(password).toHaveProperty("password");
      expect(response.statusCode).toBe(201);
    });
});