// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("POST /api/v1/posts/:id/comments", () => {
    test("It responds with a new created post", async () => {
      const auth = await tools.auth();

      const response = await request(app).post("/api/v1/posts/1/comments").set('Authorization', 'Bearer ' + auth.token).send({
            content: "Autre commentaire du premier post",
            UserId: 1
      });

      const comment = JSON.parse(response.body);
      
      console.log(comment);
      console.log(response.statusCode);
      
      expect(comment).toHaveProperty("content");
      expect(response.statusCode).toBe(201);
    });
});