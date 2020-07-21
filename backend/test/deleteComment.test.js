// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("DELETE /api/v1/posts/:id/comments/:idComment", () => {
    test("It responds with a message to confirm deleting comment", async () => {
      const auth = await tools.auth();

      const response = await request(app).delete("/api/v1/posts/1/comments/1").set('Authorization', 'Bearer ' + auth.token);

      const deleteCommentConfirm = JSON.parse(response.body);
      
      console.log(deleteCommentConfirm);
      console.log(response.statusCode);
      
      expect(response.statusCode).toBe(200);
    });
});