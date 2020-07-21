// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("GET /api/v1/users/:id", () => {
    test("It responds with user defined with his id", async () => {
      const auth = await tools.auth();
      console.log(auth);
      const response = await request(app)
        .get("/api/v1/users/1")
        .set('Authorization', 'Bearer ' + auth.token);
      const user = JSON.parse(response.body);
      
      console.log(user);
      console.log(response.statusCode);
      
      expect(user).toHaveProperty("firstName");
      expect(user).toHaveProperty("lastName");
      expect(user).toHaveProperty("isAdmin");
      expect(user).toHaveProperty("username");
      expect(response.statusCode).toBe(200);
    });
});