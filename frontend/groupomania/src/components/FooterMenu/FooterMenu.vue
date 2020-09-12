<template>
    <div>
        <div class="footer-menu-content">
            <div class="footer-menu-icons container">
                <v-btn icon @click="goToHomePage()">
                    <v-icon size="32px" v-if="!homePage()">mdi-home-outline</v-icon>
                    <v-icon size="32px" v-else color="#F44332">mdi-home</v-icon>
                </v-btn>
                
                <v-btn icon @click="goToMyProfile()">
                    <v-icon size="32px" v-if="!profilePage()">mdi-account-circle-outline</v-icon>
                    <v-icon size="32px" v-else color="#F44332">mdi-account-circle</v-icon>
                </v-btn>

                <v-btn icon @click="goToSettings()">
                    <v-icon size="32px" v-if="!settingsPage()">mdi-cog-outline</v-icon>
                    <v-icon size="32px" v-else color="#F44332">mdi-cog</v-icon>
                </v-btn>

                <v-btn icon @click="logout()">
                    <v-icon size="32px">mdi-logout</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FooterMenu',
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
                this.$router.push({ path: '/login' });
            }
        },
    }
</script>

<style scoped>

    .footer-menu-content {
        position: fixed;
        bottom: 0;
        background-color: #fff;
        box-shadow: 0px -5px 8px rgba(0, 0, 0, 0.16);
        width: 100%;
    }

    .footer-menu-icons {
        display: flex;
        justify-content: space-between;
        padding: 3px 15px;
    }

</style>