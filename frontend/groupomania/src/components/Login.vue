<template>

    <div>
        <header-sign></header-sign> 

        <div class="container">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Mot de passe"
                    type="password"
                    required
                ></v-text-field>

                <router-link :to="'/forgot-password'">
                    <p class="forgot-password">
                            Mot de passe oublié ?
                    </p>
                </router-link>

                <v-btn
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

export default {
    name: 'Login',
    data: () => ({
        valid: true,
        email: '',
        emailRules: [
            v => !!v || 'Votre E-mail est requis',
            v => /.+@.+\..+/.test(v) || 'Votre E-mail doit être valide',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Votre mot de passe est requis',
        ],
        urlApiLogin: 'http://localhost:3000/api/v1/auth/login'
    }),
    methods: {
        formSubmit() {
            this.$refs.form.validate();
            axios
            .post(`${this.urlApiLogin}`, {
                email: this.email,
                password: this.password
            })
            .then(response => {
                const token = response.data.token;
                console.log(token);
                this.$cookie.set('token', JSON.stringify(token), 1);
                this.$router.push({ path: '/posts' });
            })
        }
    },
    components: {
        'header-sign': HeaderSign
    }
}

</script>

<style scoped lang="scss">

    .container {
        margin-top: 50px;
        padding: 0 30px;
        text-align: center;
    }

    .container a {
        color: #FE421A;
        text-decoration: none;
    }

    .forgot-password {
        text-align: right;
    }

    .v-btn {
        background-color: #FE421A !important;
        color: #fff;
        font-size: 20px;
        margin-bottom: 20px;
        margin-top: 150px;
    }

</style>