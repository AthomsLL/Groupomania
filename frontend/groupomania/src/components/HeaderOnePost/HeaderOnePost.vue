<template>
    <div class="header-home">
        <v-btn icon @click="goToPosts()">
            <v-icon size="24px">mdi-arrow-left</v-icon>
        </v-btn>

        <div class="header-home-img-box">
            <v-img 
                class="header-home__img"
                src="https://res.cloudinary.com/djcmfi03h/image/upload/f_auto/v1598348834/Groupomania/logos/icon-left-font-monochrome-white_jhdwtn.png" 
                alt="Logo Groupomania blanc"
                contain
                height="100%" 
            />
        </div>

        <v-menu>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-on="on" v-bind="attrs">
                    <v-icon size="24px">mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item @click="goToMyProfile()">
                    <v-icon left>mdi-account-circle-outline</v-icon>
                    <v-list-item-title>Mon Profil</v-list-item-title>
                </v-list-item>
                <v-list-item @click="goToSettings()">
                    <v-icon left>mdi-cog-outline</v-icon>
                    <v-list-item-title>Paramètres</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout()">
                    <v-icon left>mdi-power</v-icon>
                    <v-list-item-title>Déconnexion</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>

</template>

<script>
    export default {
        name: 'HeaderOnePost',
        data() {
            return {
                
            }
        },
        methods: {
            goToPosts: function() {
                this.$router.push({ path: '/' });
            },
            goToMyProfile: function() {
                this.$router.push({ path: `/user/profile/${this.userId}`});
            },
            goToSettings: function() {
                this.$router.push({ path: '/settings' });
            },
            logout: function() {
                this.$cookie.delete('token');
                this.$router.push({ path: '/login' });
            }
        }
    }
</script>

<style scoped>

    .header-home {
        height: 100%;
        min-width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .header-home-img-box {
        max-width: 225px;
    }

    .header-home__img {
        flex: auto;
        margin: 0 10px 0 15px;
    }
    
    .v-btn--round .v-btn__content .v-icon {
        color: white;
    }

    /* MEDIA QUERIES */
    @media screen and (min-width: 428px) {
        .header-home-img-box {
            max-width: 300px;
        }
    }

    @media screen and (min-width: 768px) {
        .header-home-img-box {
            max-width: 400px;
        }
    }

</style>