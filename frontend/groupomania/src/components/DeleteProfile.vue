<template>
    <div>
        <main-header />

        <div class="container text-center">
            <div class="user-header">
                <v-avatar class="avatar" size="120">
                    <v-img v-bind:src="userDatas.avatar"  />
                </v-avatar>

                <p class="name">{{ userDatas.firstName }} {{ userDatas.lastName }}</p>

                <p class="role" v-if="userDatas.isAdmin == true">Modérateur</p>
                <p class="role" v-else>Utilisateur</p>
            </div>

            <p class="delete-text mt-8">
                Êtes-vous sûr(e) de vouloir supprimer votre compte définitivement ?
            </p>

            <div class="cta-row">
                <div v-if="userId == userDatas.id" class="cta">
                    <v-btn class="cta-delete-profile" large @click="deleteProfile()">
                        Supprimer mon compte
                    </v-btn>
                </div>

                <div v-if="userId == userDatas.id" class="cta-edit cta">
                    <v-btn color="#F44336" outlined large @click="goToSettings()">
                        Annuler
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
        name:'DeleteProfile',
        data() {
            return {
                token: '',
                userId: '',
                isAdmin: '',
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
            deleteProfile: function() {
                let deleteUserObj = {
                    url: `http://localhost:3000/api/v1/users/${this.userId}`,
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    }
                };

                axios(deleteUserObj)
                    .then(response => {
                        console.log(response.data);

                        this.$cookie.delete('token');
                        this.$router.push({ path: '/' });
                    })
                    .catch(error  => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/` })
                        }

                        console.log(error);
                    })
            },
            goToSettings: function() {
                this.$router.push({ path: '/settings' });
            },
        },
        components: {
            'main-header': Header,
        }
    }
</script>

<style lang="scss" scoped>

    .delete-text {
        font-size: 18px;
        font-weight: 500;
    }

    .cta-delete-profile {
        background-color: #FE421A !important;
        color: #fff;
        margin-top: 30px;
    }

    .cta-edit {
        margin-top: 30px;
    }

    .cta-row {
        display: flex;
        flex-direction: column;
    }

    // MEDIA QUERIES
    @media screen and (min-width: 550px) {
        .cta-row {
            flex-direction: row;
            justify-content: space-around;
            margin-top: 30px;
            padding: 0 55px;
        }
    }

</style>