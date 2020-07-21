// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("PUT /api/v1/users/:id/username", () => {
    test("It responds with a user's username updated", async () => {
      const auth = await tools.auth();

      const response = await request(app).put("/api/v1/users/1/username").set('Authorization', 'Bearer ' + auth.token).send({
        username: "Test"
      });

      const username = JSON.parse(response.body);
      
      console.log(username);
      console.log(username.username);
      console.log(response.statusCode);
      
      expect(username).toHaveProperty("username");
      expect(response.statusCode).toBe(201);
    });
});