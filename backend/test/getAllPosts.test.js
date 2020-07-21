// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("GET /api/v1/posts", () => {
    test("It responds with an array of posts", async () => {
      const auth = await tools.auth();

      const response = await request(app).get("/api/v1/posts").set('Authorization', 'Bearer ' + auth.token);
      const postList = JSON.parse(response.body);
      
      console.log(response.statusCode);
      console.log(postList);
      
      expect(postList.length).toBe(2);
      expect(postList[0]).toHaveProperty("id");
      expect(postList[0]).toHaveProperty("title");
      expect(response.statusCode).toBe(200);
    });
});