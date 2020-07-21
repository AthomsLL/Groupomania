// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");
const tools = require('../test/tools');

describe("PUT /api/v1/users/:id", () => {
    test("It responds with a user profile updated", async () => {
      const auth = await tools.auth();

      const response = await request(app).put("/api/v1/users/1").set('Authorization', 'Bearer ' + auth.token).send({
        firstName: "Athoms",
        lastName: "LL",
        avatar: "http://localhost:3000/uploads/images/avatars/coucoucava.jpg",
        department: "Informatique",
        isAdmin: true
      });

      const userProfile = JSON.parse(response.body);
      
      console.log(userProfile);
      console.log(userProfile.firstName);
      console.log(userProfile.lastName);
      console.log(userProfile.avatar);
      console.log(userProfile.department);
      console.log(userProfile.email);
      console.log(userProfile.isAdmin);
      console.log(response.statusCode);
      
      expect(userProfile).toHaveProperty("firstName");
      expect(userProfile).toHaveProperty("lastName");
      expect(userProfile).toHaveProperty("department");
      expect(response.statusCode).toBe(201);
    });
});