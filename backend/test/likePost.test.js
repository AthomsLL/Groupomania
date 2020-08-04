// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("POST /api/v1/posts/:id/likes", () => {
    test("It responds with a message to confirm the add of the like of post", async () => {
        const auth = await tools.auth();
        const response = await request(app)
            .post("/api/v1/posts/d071043f-0270-40b4-b4bc-bed4b7651bb6/likes")
            .set('Authorization', 'Bearer ' + auth.token);
        const like = JSON.parse(response.body);

        console.log(like);
        console.log(like.liked);
        console.log(like.message);
        console.log(response.statusCode);

        expect(like).toHaveProperty("liked");
        expect(like).toHaveProperty("message");
        expect(response.statusCode).toBe(201);
    })
})