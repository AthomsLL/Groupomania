<template>
    <div class="header-home">
        <v-btn icon @click="goMyProfile()" aria-label="close button">
            <v-icon size="24px">mdi-close</v-icon>
        </v-btn>

        <h1>Paramètres</h1>

        <v-menu>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-on="on" v-bind="attrs" aria-label="more options">
                    <v-icon size="24px">mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
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
    import { getToken } from '../../../helpers/decode';

    export default {
        name: 'HeaderSettings',
        mixins: [iziToast],
        data() {
            return {
                token: '',
                userId: '',
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;
        },
        methods: {
            goMyProfile: function() {
                this.$router.push({ path: `/user/profile/${this.userId}` });
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

<style scoped src="./HeaderSettings.css">

</style>