// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("POST /api/v1/posts/:id/comments", () => {
    test("It responds with a new created post", async () => {
      const auth = await tools.auth();

      const response = await request(app).post("/api/v1/posts/f4e897cb-f603-4541-aae7-f5664afd36a1/comments").set('Authorization', 'Bearer ' + auth.token).send({
            content: "Deuxième commentaire test",
            UserId: "d38b6408-88cd-44f9-90cc-1c99ad4f95df"
      });

      const comment = JSON.parse(response.body);
      
      console.log(comment);
      console.log(response.statusCode);
      
      expect(comment).toHaveProperty("content");
      expect(response.statusCode).toBe(201);
    });
});