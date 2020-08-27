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
                        v-model="firstName"
                        :rules="firstNameRules"
                        :counter="30"
                        label="Prénom"
                        required
                    ></v-text-field>
                </v-row>

                <v-row>
                    <v-text-field
                        v-model="lastName"
                        :rules="lastNameRules"
                        :counter="30"
                        label="Nom"
                        required
                    ></v-text-field>
                </v-row>

                <v-row>
                    <v-text-field
                        v-model="username"
                        :counter="15"
                        :rules="usernameRules"
                        label="Pseudo"
                        required
                    ></v-text-field>
                </v-row>
                
                <v-row class="password">
                    <v-text-field
                        v-model="password"
                        :counter="8"
                        :rules="passwordRules"
                        label="Mot de passe"
                        :type="passwordFieldType"
                        required
                    ></v-text-field>

                    <v-btn class="eye mb-0" icon v-if="passwordFieldType === 'password'" @click="toggleShowPassword()"><v-icon>mdi-eye</v-icon></v-btn>
                    <v-btn class="eye mb-0" icon v-if="passwordFieldType != 'password'" @click="toggleShowPassword()"><v-icon>mdi-eye-off</v-icon></v-btn>
                </v-row>

                <v-btn
                    class="register"
                    :disabled="!valid"
                    type="submit"
                    @click.prevent="formSubmit">
                        S'inscrire
                </v-btn>
            </v-form>

            <div class="already-account">
                <p>
                    Vous avez déjà un compte ?
                    <router-link :to="'/'">
                        <span class="login">Login</span>
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
        name: 'Register',
        data: () => ({
            valid: true,
            passwordFieldType: 'password',
            email: '',
            emailRules: [
                v => !!v || 'Votre E-mail est requis',
                v => /.+@.+\..+/.test(v) || 'Votre E-mail doit être valide',
            ],
            firstName: '',
            firstNameRules: [
                v => !!v || 'Votre prénom est requis ',
                v => v.length <= 30 || 'Votre prénom doit contenir moins de 30 caractères'
            ],
            lastName: '',
            lastNameRules: [
                v => !!v || 'Votre nom est requis ',
                v => v.length <= 30 || 'Votre nom doit contenir moins de 30 caractères'
            ],
            username: '',
            usernameRules: [
                v => !!v || 'Votre pseudo est requis',
                v => (v && v.length <= 15) || 'Votre pseudo doit contenir moins de 15 caractères',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Votre mot de passe est requis',
                v => (v && v.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v)) || 'Le mot de passe doit comporter au moins 8 caractères, dont au moins 1 minuscule, 1 majuscule et 1 chiffre'
            ],
        }),
        methods: {
            formSubmit() {
                this.$refs.form.validate();
                axios
                .post('http://localhost:3000/api/v1/auth/signup', {
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    password: this.password
                })
                .then(response => {
                    const token = response.data.token;
                    console.log(token);
                    this.$cookie.set('token', JSON.stringify(token), 1);
                    this.$router.push({ path: '/user/edit-profile' });
                })
                .catch(error => console.log(error));
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

<style scoped>

    .container {
        margin-top: 25px;
        padding: 0 30px;
        text-align: center;
    }

    .eye {
        margin-top: 16px !important;
        margin-left: 10px !important;
    }

    .v-form .password {
        flex-wrap: nowrap !important;
    }

    .register {
        background-color: #FE421A !important;
        color: #fff;
        font-size: 20px;
        margin-bottom: 20px;
        margin-top: 40px;
    }

    .already-account a {
        text-decoration: none;
    }

    .login {
        color: #FE421A;
    }

</style>