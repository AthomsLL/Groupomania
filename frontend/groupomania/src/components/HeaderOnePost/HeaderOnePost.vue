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
                notificationSystem: {
                    options: {
                        success: {
                            position: "bottomCenter",
                        },
                        error: {
                            position: "bottomCenter"
                        },
                    }
                }
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
                this.$toast.success('Vous avez été déconnecté !', 'OK', this.notificationSystem.options.success);
                setTimeout(() => {
                    this.$router.push({ path: '/login' });
                }, 100)
            }
        }
    }
</script>

<style scoped src="./HeaderOnePost.css">

</style>