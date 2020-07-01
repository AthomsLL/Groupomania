// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");

describe("GET /api/v1/users", () => {
    test("It responds with an array of users", async () => {
      const response = await request(app).get("/api/v1/users");
      const userList = JSON.parse(response.body);
      
      console.log(response.statusCode);
      
      expect(userList.length).toBe(1);
      expect(userList[0]).toHaveProperty("id");
      expect(userList[0]).toHaveProperty("username");
      expect(response.statusCode).toBe(200);
    });
});