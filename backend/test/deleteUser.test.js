// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("DELETE /api/v1/users/:id", () => {
    test("It responds with a message to confirm deleting user", async () => {
      const auth = await tools.auth();

      const response = await request(app).delete("/api/v1/users/3").set('Authorization', 'Bearer ' + auth.token);

      const deleteConfirm = JSON.parse(response.body);
      
      console.log(deleteConfirm);
      console.log(response.statusCode);
      
      expect(response.statusCode).toBe(200);
    });
});