<template>

    <div>
        <header-sign></header-sign> 

        <div class="container">
            <v-form class="login-form" ref="form" v-model="valid" lazy-validation>
                <v-row>
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                    ></v-text-field>
                </v-row>

                <v-row>
                    <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        label="Mot de passe"
                        :type="passwordFieldType"
                        required
                    ></v-text-field>

                    <v-btn class="eye mb-0" icon v-if="passwordFieldType === 'password'" @click="toggleShowPassword()" aria-label="eye icon"><v-icon>mdi-eye</v-icon></v-btn>
                    <v-btn class="eye mb-0" icon v-if="passwordFieldType != 'password'" @click="toggleShowPassword()" aria-label="eye-off icon"><v-icon>mdi-eye-off</v-icon></v-btn>
                </v-row>

                <router-link :to="'/forgot-password'">
                    <p class="forgot-password">
                            Mot de passe oublié ?
                    </p>
                </router-link>

                <v-btn
                    class="login"
                    :disabled="!valid"
                    type="submit"
                    @click.prevent="formSubmit">
                        Se connecter
                </v-btn>
            </v-form>

            <div class="already-account">
                <p>
                    Nouvel utilisateur ?
                    <router-link :to="'/register'">
                        <span class="register">Inscription</span>
                    </router-link>
                </p>
            </div>
        </div>
    </div>   
    
</template>

<script>

import HeaderSign from '../HeaderSign/HeaderSign';
import { getToken } from '../../../helpers/decode';

export default {
    name: 'Login',
    data() {
        return {
            valid: true,
            userId: '',
            token: '',
            passwordFieldType: 'password',
            email: '',
            emailRules: [
                v => !!v || 'Votre E-mail est requis',
                v => /.+@.+\..+/.test(v) || 'Votre E-mail doit être valide',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Votre mot de passe est requis',
            ],
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
    created() {
        if (this.$cookie.get('token') != null) {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;

            this.getAllPosts();
        }
    },
    methods: {
        getAllPosts: function() {
            this.axios
                .get(`http://localhost:3000/api/v1/posts`, {
                    headers: {
                        Authorization: "Bearer " + this.token,
                    }
                })
                .then(
                    setTimeout(() => {
                        this.$router.push({ path: '/' })
                    }, 1000)
                )
        },
        formSubmit: function() {
            this.$refs.form.validate();
            this.axios
                .post('http://localhost:3000/api/v1/auth/login', {
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                    const token = response.data.token;
                    this.$cookie.set('token', JSON.stringify(token), 1);
                    this.$toast.success('Bienvenue !', 'Connexion réussie !', this.notificationSystem.options.success);
                    setTimeout(() => {
                        this.$router.push({ path: `/` });
                    }, 100)
                })
                .catch(error => { 
                    if (error.response.status == 404) {
                        this.$toast.error("Merci de vous authentifier avec un utilisateur enregistré !", 'Utilisateur inconnu !', this.notificationSystem.options.error)
                    }

                    if (error.response.status == 401) {
                        this.$toast.error("Merci de renseigner vos identifiants !", 'Identifiants incorrects !', this.notificationSystem.options.error)
                    }

                    console.log(error);
                })
        },
        toggleShowPassword: function() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
        },
    },
    components: {
        'header-sign': HeaderSign
    }
}

</script>

<style scoped src="./Login.css">

</style>