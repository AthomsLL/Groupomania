<template>
    <div>
        <div class="footer-menu-content">
            <div class="footer-menu-icons container">
                <v-btn icon @click="goToHomePage()" aria-label="home button">
                    <v-icon size="32px" v-if="!homePage()">mdi-home-outline</v-icon>
                    <v-icon size="32px" v-else color="#F44332">mdi-home</v-icon>
                </v-btn>
                
                <v-btn icon @click="goToMyProfile()" aria-label="profile button">
                    <v-icon size="32px" v-if="!profilePage()">mdi-account-circle-outline</v-icon>
                    <v-icon size="32px" v-else color="#F44332">mdi-account-circle</v-icon>
                </v-btn>

                <v-btn icon @click="goToSettings()" aria-label="settings button">
                    <v-icon size="32px" v-if="!settingsPage()">mdi-cog-outline</v-icon>
                    <v-icon size="32px" v-else color="#F44332">mdi-cog</v-icon>
                </v-btn>

                <v-btn icon @click="logout()" aria-label="logout button">
                    <v-icon size="32px">mdi-logout</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import iziToast from '../mixins/iziToast';

    export default {
        name: 'FooterMenu',
        mixins: [iziToast],
        props: ['userId'],
        data() {
            return {
                
            }
        },
        methods: {
            homePage: function() {
                if (this.$route.path == '/') {
                    return true;
                }
            },
            profilePage: function() {
                if (this.$route.path == `/user/profile/${this.userId}`) {
                    return true;
                }
            },
            settingsPage: function() {
                if (this.$route.path == '/settings') {
                    return true;
                }
            },
            goToHomePage: function() {
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
                this.$toast.success('Vous avez été déconnecté !', 'OK', this.notificationSystem.options.success);
                setTimeout(() => {
                    this.$router.push({ path: '/login' });
                }, 100)
            }
        },
    }
</script>

<style scoped src="./FooterMenu.css">

</style>