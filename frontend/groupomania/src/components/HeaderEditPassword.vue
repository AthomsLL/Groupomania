<template>
    <div class="header-home">
        <v-btn icon @click="goToSettings()">
            <v-icon size="24px">mdi-close</v-icon>
        </v-btn>

        <h1>Modifier mot de passe</h1>

        <v-menu>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-on="on" v-bind="attrs">
                    <v-icon size="24px">mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item @click="goToSettings()">
                    <v-icon left size="24px">mdi-cog-outline</v-icon>
                    <v-list-item-title>Paramètres</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout()">
                    <v-icon left size="24px">mdi-power</v-icon>
                    <v-list-item-title>Déconnexion</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>

</template>

<script>
    export default {
        name: 'HeaderPosts',
        data() {
            return {
                
            }
        },
        methods: {
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

<style scoped lang="scss">

    h1 {
        color: white;
        font-size: 23px;
        text-transform: uppercase;
    }

    .header-home {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
    }

    .v-btn--round .v-btn__content .v-icon {
        color: white;
    }

</style>