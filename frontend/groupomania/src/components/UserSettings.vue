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
</template>

<script>
    import Header from './Header';
    import { getToken } from '../../helpers/decode';
    import axios from 'axios'

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

                axios(infosUserObj)
                    .then(response => {
                        this.userDatas = response.data;
                        console.log(this.userDatas);
                    })
                    .catch(error  => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/` })
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
        }
    }
</script>

<style scoped lang="scss">

    .infos-title {
        font-size: 20px;
        margin-bottom: 10px;
    }

    .infos-subtitle {
        font-size: 18px;
    }

    .cta-edit {
        margin-top: 20px;
    }

    .cta-delete-profile {
        background-color: #FE421A !important;
        color: #fff;
        margin-top: 20px;
    }

</style>
    
