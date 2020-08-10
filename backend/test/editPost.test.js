// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("PUT /api/v1/posts/:id", () => {
    test("It responds with a post updated", async () => {
      const auth = await tools.auth();

      const response = await request(app).put("/api/v1/posts/729d9b1e-cb01-438d-9c37-90f199e71c55").set('Authorization', 'Bearer ' + auth.token).send({
        attachment: "https://res.cloudinary.com/djcmfi03h/image/upload/f_auto/v1597069735/priscilla-du-preez-W3SEyZODn8U-unsplash_w5ex8m.jpg",
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