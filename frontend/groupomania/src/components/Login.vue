<template>

    <div>
        <header-sign></header-sign> 

        <div class="container">
            <v-form ref="form" v-model="valid" lazy-validation>
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

                    <v-btn class="eye mb-0" icon v-if="passwordFieldType === 'password'" @click="toggleShowPassword()"><v-icon>mdi-eye</v-icon></v-btn>
                    <v-btn class="eye mb-0" icon v-if="passwordFieldType != 'password'" @click="toggleShowPassword()"><v-icon>mdi-eye-off</v-icon></v-btn>
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

import HeaderSign from './HeaderSign'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
    name: 'Login',
    data: () => ({
        valid: true,
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
    }),
    methods: {
        formSubmit() {
            this.$refs.form.validate();
            axios
            .post('http://localhost:3000/api/v1/auth/login', {
                email: this.email,
                password: this.password
            })
            .then(response => {
                const token = response.data.token;
                this.$cookie.set('token', JSON.stringify(token), 1);
                this.$router.push({ path: '/posts' });
            })
            .catch(error => { 
                if (error.response.status == 404) {
                    swal.fire('UTILISATEUR INCONNU', "Merci de vous authentifier avec un utilisateur enregistré", 'error')
                }

                if (error.response.status == 401) {
                    swal.fire('IDENTIFIANTS INCORRECTS', "Merci de renseigner vos identifiants", 'error')
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

<style scoped lang="scss">

    .container {
        margin-top: 25px;
        padding: 0 30px;
        text-align: center;
    }

    .container a {
        color: #FE421A;
        text-decoration: none;
    }

    .eye {
        margin-top: 16px !important;
        margin-left: 10px !important;
    }

    .forgot-password {
        text-align: right;
    }

    .login {
        background-color: #FE421A !important;
        color: #fff;
        font-size: 20px;
        margin-bottom: 20px;
        margin-top: 80px;
    }

</style>