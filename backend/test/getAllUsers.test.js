// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("GET /api/v1/users", () => {
    test("It responds with an array of users", async () => {
      const auth = await tools.auth();

      const response = await request(app).get("/api/v1/users").set('Authorization', 'Bearer ' + auth.token);
      const userList = JSON.parse(response.body);
      
      console.log(userList);
      console.log(response.statusCode);
      
      expect(userList.length).toBe(2);
      expect(userList[1]).toHaveProperty("id");
      expect(userList[1]).toHaveProperty("username");
      expect(response.statusCode).toBe(200);
    });
});