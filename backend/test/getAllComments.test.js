// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("GET /api/v1/posts/:id/comments", () => {
    test("It responds with an array of post's comments ", async () => {
      const auth = await tools.auth();

      const response = await request(app).get("/api/v1/posts/1/comments").set('Authorization', 'Bearer ' + auth.token);
      const commentList = JSON.parse(response.body);
      
      console.log(response.statusCode);
      console.log(commentList);
      
      expect(commentList.length).toBe(3);
      expect(commentList[0]).toHaveProperty("id");
      expect(commentList[0]).toHaveProperty("content");
      expect(response.statusCode).toBe(200);
    });
});