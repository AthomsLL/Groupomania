// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("POST /api/v1/posts", () => {
    test("It responds with a new created post", async () => {
      const auth = await tools.auth();

      const response = await request(app).post("/api/v1/posts").set('Authorization', 'Bearer ' + auth.token).send({
            title: "Troisième post de l'user test@test.fr",
            content: "Lorem ipsum sin amet, frhejpdapf hfpezfioeznf b ezbfioeb fznfiebfi eobfeizfn fbe ofeo fbe fbezio fnef ioeznf",
            attachment: "http://localhost:3000/uploads/images/testPost.png",
            UserId: "22e533aa-7e8d-4e87-9de0-25ca9a1b00b0"
      });

      const post = JSON.parse(response.body);
      
      console.log(post);
      console.log(response.statusCode);
      
      expect(post).toHaveProperty("title");
      expect(response.statusCode).toBe(201);
    });
});


