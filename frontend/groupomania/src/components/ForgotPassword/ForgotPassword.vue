<template>
    <div>
        <header-sign></header-sign>
        <div class="container">
            <h1 class="feature-dev">
                FEATURE EN COURS DE DEVELOPPEMENT
            </h1>

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

                <div class="cta-forgot">
                    <div>
                        <v-btn
                            class="cta-confirm"
                            :disabled="true"
                            type="submit"
                            @click.prevent="formSubmit">
                                Confirmer
                        </v-btn>
                    </div>

                    <div>
                        <v-btn
                            outlined
                            color="#EA1C04"
                            type="button"
                            @click="goToLogin()">
                                Annuler
                        </v-btn>
                    </div>
                </div>
            </v-form>
        </div>
    </div>
</template>

<script>
    import HeaderSign from '../HeaderSign/HeaderSign'

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
            formSubmit: function() {
                this.$refs.form.validate();
            },
            goToLogin: function() {
                this.$router.push({ path: '/login' });
            }
        },
        components: {
            'header-sign': HeaderSign
        }
    }

</script>

<style scoped src="./ForgotPassword.css">

</style>