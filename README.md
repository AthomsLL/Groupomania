# Groupomania #

Projet 7 de la formation Développeur Web "Créez un réseau social d'entreprise".

La partie frontend du projet est développée avec : 
- VueJS 
- Vuetify.

La partie backend du projet est développée avec :
- NodeJS
- Express
- Sequelize 
- Une base de données PostgreSQL 
- Et l'outil PGAdmin.

### Pré requis ###

Node JS doit être installé localement sur la machine, ainsi que npm.
@vue/cli doit être installé localement pour pouvoir lancer le frontend.

Côté frontend, plusieurs dépendances npm sont nécessaires : 
- Axios
- Filepond et ses plugins (file-validate - image-crop - image-exif-orientation - image-preview)
- Izitoast
- jwt-decode
- Material-design-icons-iconfont
- Moment
- Vue
- Vue-axios
- Vue-filepond
- Vue-izitoast
- Vue-moment
- Vue-router
- Vuelidate
- Vuetify

Côté backend, plusieurs dépendances npm sont nécessaires : 
- Bcrypt
- Body-Parser
- Cloudinary
- Dotenv
- Email-validator
- Express
- Express-bouncer
- Express-sequelize
- Helmet
- jsonwebtoken
- Nodemon
- Passport
- Passport-jwt
- Password-validator
- Pg
- Pg-hstore
- Sequelize
- Sequelize-cli
- Supertest
- Uniqid

### Connexion ###
La connexion à la base de données "groupomania" s'effectue avec des identifiants créés et stockés dans des variables d'environnement.

### Installation ###
Pour installer les dépendances listées ci-dessus, voici la marche à suivre : 

Pour le frontend, se placer à l'aide du terminal dans le dossier "frontend/groupomania" et taper la commande : "npm install".
Ceci installera les dépendances nécessaires au fonctionnement du frontend.

Pour le backend, se placer toujours à l'aide du terminal dans le dossier "backend" et taper la commande : "npm install".
Ceci installera les dépendances nécessaires au fonctionnement du backend.

### Lancement ###

Côté frontend : 
    - Dans le terminal, se placer dans le dossier frontend/groupomania du projet et taper la commande "npm run serve"
    - Le frontend se lance sur http://localhost:8080/.

Côté backend : 
    - Dans le terminal, se placer dans le dossier backend du projet et taper la commande "nodemon server"
    - Le backend (API) se lance sur http://localhost:3000/api/v1.

