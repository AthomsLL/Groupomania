<template>
    <div>
        <main-header />

        <div class="container">
            <div class="user-header">
                <v-avatar class="avatar" size="120">
                    <v-img v-bind:src="userDatas.avatar"  />
                </v-avatar>

                <p class="name">{{ userDatas.firstName }} {{ userDatas.lastName }}</p>

                <p class="role" v-if="userDatas.isAdmin == true">Modérateur</p>
                <p class="role" v-else>Utilisateur</p>
            </div>

            <div class="mt-3">
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title class="infos-title">Pseudo</v-list-item-title>
                        <v-list-item-subtitle class="infos-subtitle">{{ userDatas.username }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <div class="cta-row">
                    <div v-if="userId == userDatas.id" class="cta-edit cta">
                        <v-btn color="#F44336" outlined @click="goToEditUsername()">
                            Modifier Pseudo
                        </v-btn>
                    </div>

                    <div v-if="userId == userDatas.id" class="cta-edit cta">
                        <v-btn color="#F44336" outlined @click="goToEditPassword()">
                            Modifier Mot de passe
                        </v-btn>
                    </div>

                    <div v-if="userId == userDatas.id" class="cta">
                        <v-btn class="cta-delete-profile" @click="goToDeleteProfile()">
                            Supprimer mon compte
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>

        <footer-menu :userId="userId" />
    </div>
</template>

<script>
    import Header from '../Header/Header';
    import FooterMenu from '../FooterMenu/FooterMenu';
    import { getToken } from '../../../helpers/decode';

    export default {
        name: 'UserSettings',
        data() {
            return {
                token: '',
                userId: '',
                isAdmin: '',
                username: '',
                userDatas: '',
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;
            this.isAdmin = user.isAdmin;

            this.getInfosUserMe();
        },
        methods: {
            getInfosUserMe: function() {
                let infosUserObj = {
                    url: `http://localhost:3000/api/v1/users/${this.userId}`,
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    }
                };

                this.axios(infosUserObj)
                    .then(response => {
                        this.userDatas = response.data;
                    })
                    .catch(error  => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/login` })
                        }

                        console.log(error);
                    });
            },
            goToEditUsername: function() {
                this.$router.push({ path: '/edit-username' });
            },
            goToEditPassword: function() {
                this.$router.push({ path: '/edit-password' });
            },
            goToDeleteProfile: function() {
                this.$router.push({ path: '/delete-profile' });
            },
        },
        components: {
            'main-header': Header,
            'footer-menu': FooterMenu,
        }
    }
</script>

<style scoped src="./UserSettings.css">

</style>
    
