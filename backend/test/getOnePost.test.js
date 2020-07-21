// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("GET /api/v1/posts/:id", () => {
    test("It responds with post defined with his id", async () => {
      const auth = await tools.auth();
      console.log(auth);
      const response = await request(app)
        .get("/api/v1/posts/2")
        .set('Authorization', 'Bearer ' + auth.token);
      const post = JSON.parse(response.body);
      
      console.log(post);
      console.log(response.statusCode);
      
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("content");
      expect(post).toHaveProperty("username");
      expect(response.statusCode).toBe(200);
    });
});