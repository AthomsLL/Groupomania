// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("PUT /api/v1/posts/:id/comments/:commentId", () => {
    test("It responds with a comment updated", async () => {
      const auth = await tools.auth();

      const response = await request(app).put("/api/v1/posts/1/comments/4").set('Authorization', 'Bearer ' + auth.token).send({
        content: "L'userId 1 peut modifier son commentaire",
      });

      const commentUpdated = JSON.parse(response.body);
      
      console.log(commentUpdated);
      console.log(commentUpdated.content);
      console.log(response.statusCode);
      
      expect(commentUpdated).toHaveProperty("id");
      expect(commentUpdated).toHaveProperty("content");
      expect(response.statusCode).toBe(201);
    });
});