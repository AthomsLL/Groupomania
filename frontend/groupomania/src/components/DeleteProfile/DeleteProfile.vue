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
                    <v-btn color="#EA1C04" outlined large @click="goToSettings()">
                        Annuler
                    </v-btn>
                </div>
            </div>
        </div>

    </div>
</template>
    
<script>
    import iziToast from '../mixins/iziToast';
    import Header from '../Header/Header';
    import { getToken } from '../../../helpers/decode';

    export default {
        name:'DeleteProfile',
        mixins: [iziToast],
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
            deleteProfile: function() {
                this.axios
                    .delete(`http://localhost:3000/api/v1/users/${this.userId}`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        }
                    })
                    .then(() => {
                        this.$cookie.delete('token');
                        this.$toast.success('Compte utilisateur supprimé avec succès !', 'OK', this.notificationSystem.options.success);
                        setTimeout(() => {
                            this.$router.push({ path: '/login' });
                        }, 100)
                    })
                    .catch(error  => {
                        this.$toast.error('Suppression du compte utilisateur impossible !', 'Merci de réessayer.', this.notificationSystem.options.error);
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/login` })
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

<style scoped src="./DeleteProfile.css">

</style>