// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("POST /api/v1/posts", () => {
    test("It responds with a new created post", async () => {
      const auth = await tools.auth();

      const response = await request(app).post("/api/v1/posts").set('Authorization', 'Bearer ' + auth.token).send({
            title: "Deuxième post de l'user test@test.fr",
            content: "Lorem ipsum sin amet, frhejpdapf hfpezfioeznf b ezbfioeb fznfiebfi eobfeizfn fbe ofeo fbe fbezio fnef ioeznf",
            attachment: "https://res.cloudinary.com/djcmfi03h/image/upload/f_auto/v1597069735/priscilla-du-preez-W3SEyZODn8U-unsplash_w5ex8m.jpg",
            UserId: "1c50ee41-7752-4afa-b581-495bedf53b89"
      });

      const post = JSON.parse(response.body);
      
      console.log(post);
      console.log(response.statusCode);
      
      expect(post).toHaveProperty("title");
      expect(response.statusCode).toBe(201);
    });
});


