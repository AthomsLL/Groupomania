<template>
    <div>
        <header-sign></header-sign>
        <div class="container">
            <p class="feature-dev">
                FEATURE EN COURS DE DEVELOPPEMENT
            </p>

            <p class="forgot-text">
                Vous pourrez renseigner votre email pour recevoir un lien qui permettra de modifier votre mot de passe
            </p>

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-btn
                    :disabled="true"
                    type="submit"
                    @click.prevent="formSubmit">
                        Confirmer
                </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
    import HeaderSign from './HeaderSign'

    export default {
        name: 'ForgotPassword',
        data: () => ({
            valid: true,
            email: '',
            emailRules: [
                v => !!v || 'Votre E-mail est requis',
                v => /.+@.+\..+/.test(v) || 'Votre E-mail doit être valide',
            ],
        }),
        methods: {
            formSubmit() {
                this.$refs.form.validate();
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

        .feature-dev, .forgot-text {
            font-weight: 500;
        }

        .feature-dev {
            font-size: 25px;
            margin-bottom: 20px;
        }

        .forgot-text {
            font-size: 18px;
        }

        .v-form {
            margin-top: 50px;
        }

        .v-btn {
            background-color: #FE421A !important;
            color: #fff;
            font-size: 20px;
            margin-top: 20px;
        }
    }

</style>