<template>
    
    <div>
        <div class="header-sign-contenu">
            <div class="circle-1"></div>
            <div class="circle-2">
                <div class="circle-2__img-box">
                    <img src="../../src/assets/icon-left-white.png" alt="Logo Groupomania blanc">
                </div>

                <h1 v-if="register()">Inscription</h1>
                <h1 v-if="login()">Bon retour, </h1>
                <h1 v-if="forgotPassword()">Mot de passe oublié</h1>
                <h1 v-if="renewPassword()">Mot de passe oublié</h1>
                
            </div>
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
                if(this.$route.path == '/') {
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

<style scoped lang="scss">

    .header-sign-contenu {
        height: 25vh;
    }

    .circle-1, .circle-2 {
        background-color: #F44336;
        height: 100vh;
        width: 100vw;
    }

    .circle-1 {
        clip-path: circle(50%);
        -webkit-clip-path: circle(50%);
        opacity: .53;
        position: absolute;
        left: 4.38%;
        top: -62.8%;
    }

    .circle-2 {
        clip-path: circle(50%);
        -webkit-clip-path: circle(50%);
        position: absolute;
        top: -64%;

        &__img-box {
            position: absolute;
            top: 52%;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
        }

        &__img-box img {
            height: 100%;
            width: 100%;
        }

        h1 {
            color: #fff;
            position: absolute;
            top: 77%;
            text-align: center;
            width: 100%;
        }
    }

</style>