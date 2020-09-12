<template>
    
    <div>
        <div class="header-sign-contenu">
            <div class="header-sign-contenu__img-box">
                <img src="https://res.cloudinary.com/djcmfi03h/image/upload/f_auto/v1598348834/Groupomania/logos/icon-left-font-monochrome-white_jhdwtn.png" alt="Logo Groupomania blanc">
            </div>

            <h1 v-if="register()">Inscription</h1>
            <h1 v-if="login()">Bon retour !</h1>
            <h1 v-if="forgotPassword()">Mot de passe oublié</h1>
            <h1 v-if="renewPassword()">Mot de passe oublié</h1>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'HeaderSign',
        methods: {
            register: function() {
                if(this.$route.path == '/register') {
                    return true;
                }
            },
            login: function() {
                if(this.$route.path == '/login') {
                    return true;
                }
            },
            forgotPassword: function() {
                if(this.$route.path == '/forgot-password') {
                    return true;
                }
            },
            renewPassword: function() {
                if(this.$route.path == '/recover-password') {
                    return true;
                }
            }
        }
    }

</script>

<style scoped>

    .header-sign-contenu {
        background-color: #F44336;
        box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.16);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 15px 15px 15px;
    }

    .header-sign-contenu__img-box {
        max-width: 400px;
    }

    .header-sign-contenu__img-box img {
        height: 100%;
        width: 100%;
    }

    h1 {
        color: #fff;
        font-size: 28px;
    }

    /* MEDIA QUERIES */
    @media screen and (min-width: 450px) {
        h1 {
            font-size: 36px;
        }
    }

</style>