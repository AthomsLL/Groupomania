const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("DELETE /api/v1/posts/:id/likes/:userId", () => {
    test("It responds with a message to confirm the delete of the like of post", async () => {
        const auth = await tools.auth();
        const response = await request(app)
            .delete("/api/v1/posts/d071043f-0270-40b4-b4bc-bed4b7651bb6/likes/22e533aa-7e8d-4e87-9de0-25ca9a1b00b0")
            .set('Authorization', 'Bearer ' + auth.token);
        const unlike = JSON.parse(response.body);

        console.log(unlike);
        console.log(unlike.liked);
        console.log(unlike.message);
        console.log(response.statusCode);

        expect(unlike).toHaveProperty("liked");
        expect(unlike).toHaveProperty("message");
        expect(response.statusCode).toBe(200);
    })
})