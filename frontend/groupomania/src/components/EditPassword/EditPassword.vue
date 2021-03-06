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
                <v-row class="password">
                    <v-text-field
                        v-model="newPassword"
                        :rules="passwordRules"
                        label="Nouveau mot de passe"
                        :type="passwordFieldType1"
                        required
                    ></v-text-field>

                    <v-btn class="eye mb-0" icon v-if="passwordFieldType1 === 'password'" @click="toggleShowPassword1()" aria-label="eye icon"><v-icon>mdi-eye</v-icon></v-btn>
                    <v-btn class="eye mb-0" icon v-if="passwordFieldType1 != 'password'" @click="toggleShowPassword1()" aria-label="eye-off icon"><v-icon>mdi-eye-off</v-icon></v-btn>
                </v-row>

                <v-row class="password">
                    <v-text-field
                        v-model="newPasswordConf"
                        :rules="passwordRulesConf"
                        label="Confirmer nouveau mot de passe"
                        :type="passwordFieldType2"
                        required
                    ></v-text-field>

                    <v-btn class="eye mb-0" icon v-if="passwordFieldType2 === 'password'" @click="toggleShowPassword2()" aria-label="eye icon"><v-icon>mdi-eye</v-icon></v-btn>
                    <v-btn class="eye mb-0" icon v-if="passwordFieldType2 != 'password'" @click="toggleShowPassword2()" aria-label="eye-off icon"><v-icon>mdi-eye-off</v-icon></v-btn>
                </v-row>

                <div class="cta-row">
                    <div>
                        <v-btn
                            class="cta cta-edit"
                            :disabled="!valid"
                            type="submit"
                            @click.prevent="formSubmit">
                                Modifier Mot de passe
                        </v-btn>
                    </div>

                    <div>
                        <v-btn color="#EA1C04" outlined class="cta" @click="goToSettings()">
                            Annuler
                        </v-btn>
                    </div>
                </div>
            </v-form>

        </div>
        
    </div>
</template>
    
<script>
    import iziToast from '../mixins/iziToast';
    import Header from '../Header/Header'
    import { getToken } from '../../../helpers/decode'

    export default {
        name: 'EditPassword',
        mixins: [iziToast],
        data() {
            return {
                token: '',
                userId: '',
                isAdmin: '',
                userDatas: '',
                newPassword: '',
                newPasswordConf: '',
                passwordFieldType1: 'password',
                passwordFieldType2: 'password',
                passwordRules: [
                    v => !!v || 'Votre mot de passe est requis',
                    v => (v && v.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v)) || 'Le mot de passe doit comporter 8 caractères, dont au moins 1 minuscule, 1 majuscule et 1 chiffre'
                ],
                passwordRulesConf: [
                    v => !!v || 'Votre mot de passe est requis',
                    v => (v && v.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v)) || 'Le mot de passe doit comporter au moins 8 caractères, dont au moins 1 minuscule, 1 majuscule et 1 chiffre',
                    v => (v && this.newPasswordConf === this.newPassword)  || 'Les mots de passe ne correspondent pas',
                ],
                valid: true,
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
            formSubmit: function() {
                this.$refs.form.validate();
                
                if (this.newPassword == this.newPasswordConf) {
                    this.axios
                        .put(`http://localhost:3000/api/v1/users/${this.userId}/password`, {
                            password: this.newPassword
                        }, {
                            headers: {
                                Authorization: "Bearer " + this.token,
                            }
                        })
                        .then(() => {
                            this.$toast.success('Mot de passe modifié avec succès !', 'OK', this.notificationSystem.options.success);
                            setTimeout(() => {
                                this.$router.push({ path: '/settings' });
                            }, 100)
                        })
                        .catch(error  => {
                            this.$toast.error('Merci de réessayer.', 'Impossible de modifier le mot de passe', this.notificationSystem.options.error);
                            if (error.response.status == 401) {
                                this.$cookie.delete('token');
                                this.$router.push({ path: `/login` })
                            }

                            console.log(error);
                        });   
                } else {
                    this.$toast.error('Merci de réessayer.', 'Les mot de passe ne correspondent pas !', this.notificationSystem.options.error);
                }
            },
            toggleShowPassword1: function() {
                this.passwordFieldType1 = this.passwordFieldType1 === 'password' ? 'text' : 'password';
            },
            toggleShowPassword2: function() {
                this.passwordFieldType2 = this.passwordFieldType2 === 'password' ? 'text' : 'password';
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

<style scoped src="./EditPassword.css">

</style>