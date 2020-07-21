// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("PUT /api/v1/posts/:id", () => {
    test("It responds with a post updated", async () => {
      const auth = await tools.auth();

      const response = await request(app).put("/api/v1/posts/1").set('Authorization', 'Bearer ' + auth.token).send({
        title: "L'userId 1 ne peut pas modifier le post de quelqu'un d'autre",
        content: "Lorem ipsum sin amet, frhejpdapf hfpezfioeznf b ezbf",
        attachment: "http://localhost:3000/uploads/images/testPost4.png",
      });

      const postUpdated = JSON.parse(response.body);
      
      console.log(postUpdated);
      console.log(postUpdated.title);
      console.log(postUpdated.content);
      console.log(response.statusCode);
      
      expect(postUpdated).toHaveProperty("id");
      expect(postUpdated).toHaveProperty("title");
      expect(postUpdated).toHaveProperty("content");
      expect(response.statusCode).toBe(201);
    });
});