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

            <v-form class="form mt-4" ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="oldUsername"
                    :counter="15"
                    :rules="usernameRules"
                    label="Ancien Pseudo"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="newUsername"
                    :counter="15"
                    :rules="usernameRules"
                    label="Nouveau Pseudo"
                    required
                ></v-text-field>

                <v-btn
                    class="cta cta-edit"
                    :disabled="!valid"
                    type="submit"
                    @click.prevent="formSubmit">
                        Modifier Pseudo
                </v-btn>
            </v-form>

            <v-btn color="#F44336" outlined class="cta" @click="goToSettings()">
                Annuler
            </v-btn>
            
        </div>
        
    </div>
</template>
    
<script>
    import Header from './Header';
    import { getToken } from '../../helpers/decode';
    import axios from 'axios'
    import swal from 'sweetalert2';

    export default {
        name: 'EditUsername',
        data() {
            return {
                token: '',
                userId: '',
                isAdmin: '',
                userDatas: '',
                valid: true,
                oldUsername: '',
                newUsername: '',
                usernameRules: [
                    v => !!v || 'Votre pseudo est requis',
                    v => (v && v.length <= 15) || 'Votre pseudo doit contenir moins de 15 caractères',
                ],
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
            formSubmit() {
                this.$refs.form.validate();
                
                if (this.oldUsername == this.userDatas.username) {
                    axios
                    .put(`http://localhost:3000/api/v1/users/${this.userId}/username`, {
                        username: this.newUsername
                    }, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        }
                    })
                    .then(() => {
                        swal.fire({
                            icon: 'success',
                            title: 'Pseudo modifié avec succès !',
                            timer: 1500
                        });
                        this.$router.push({ path: '/settings' });
                    })
                    .catch(error  => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/` })
                        }

                        console.log(error);
                    });   
                } else {
                    swal.fire('Ancien Pseudo Incorrect !', "Merci de renseigner le bon pseudo.", 'error')
                }
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

    .form {
        padding: 0 30px;
    }

    .cta {
        margin-top: 20px;
    }

    .cta-edit {
        background-color: #FE421A !important;
        color: #fff;
    }

</style>