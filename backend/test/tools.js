// Utilisation de supertest pour tester les requêtes/réponses HTTP
const request = require("supertest");

// Import de app.js pour le bon import des routes
const app = require("../app");

export async function auth() {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "test@test.fr",
      password: "Testtest1"
    });
  
   const auth = JSON.parse(response.body);

   return auth;
}