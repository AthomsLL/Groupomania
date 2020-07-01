// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");

describe("GET /api/v1/posts", () => {
    test("It responds with an array of posts", async () => {
      const response = await request(app).get("/api/v1/posts");
      const postList = JSON.parse(response.body);
      
      console.log(response.statusCode);
      
      expect(postList.length).toBe(1);
      expect(postList[0]).toHaveProperty("id");
      expect(postList[0]).toHaveProperty("title");
      expect(response.statusCode).toBe(200);
    });
});