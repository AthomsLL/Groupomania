<template>
    <div class="header-home">
        <v-btn icon @click="goToSettings()" aria-label="close button">
            <v-icon size="24px">mdi-close</v-icon>
        </v-btn>

        <h1>Modifier pseudo</h1>

        <v-menu>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-on="on" v-bind="attrs" aria-label="more options">
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
    import iziToast from '../mixins/iziToast';

    export default {
        name: 'HeaderEditUsername',
        mixins: [iziToast],
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
                this.$toast.success('Vous avez été déconnecté !', 'OK', this.notificationSystem.options.success);
                setTimeout(() => {
                    this.$router.push({ path: '/login' });
                }, 100)
            }
        }
    }
</script>

<style scoped src="./HeaderEditUsername.css">

</style>