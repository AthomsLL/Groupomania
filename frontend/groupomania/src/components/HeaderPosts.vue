<template>
    <div class="header-home">
        <v-img 
            src="https://res.cloudinary.com/djcmfi03h/image/upload/c_thumb,h_100,w_300/v1596188651/Groupomania/logos/icon-left-font-monochrome-white_ci45w3.png" 
            alt="Logo Groupomania blanc"
            contain
            height="100%" 
        />

        <v-menu :close-on-content-click="closeOnContentClick">
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-on="on" v-bind="attrs">
                    <v-icon size="24px">mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
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
        name: 'HeaderPosts',
        data: () => ({

        }),
        methods: {
            goToSettings: function() {
                this.$router.push({ path: '/user/settings' });
            },
            logout: function() {
                this.$cookie.delete('token');
                this.$router.push({ path: '/' });
            }
        }
    }
</script>

<style scoped lang="scss">

    .header-home {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
    }

    .v-btn--round .v-btn__content .v-icon {
        color: white;
    }

</style>