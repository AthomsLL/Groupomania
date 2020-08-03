// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("GET /api/v1/posts/:id/likes/:userId", () => {
    test("It responds with a message notify if post is liked by the user", async () => {
        const auth = await tools.auth();
        const response = await request(app)
            .get("/api/v1/posts/d071043f-0270-40b4-b4bc-bed4b7651bb6/likes/22e533aa-7e8d-4e87-9de0-25ca9a1b00b0")
            .set('Authorization', 'Bearer ' + auth.token);
        const like = JSON.parse(response.body);

        console.log(like);
        console.log(like.liked);
        console.log(response.statusCode);

        expect(like).toHaveProperty("liked");
        expect(response.statusCode).toBe(200);
    })
})