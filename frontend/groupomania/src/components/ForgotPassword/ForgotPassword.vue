<template>
    <div>
        <header-sign></header-sign>
        <div class="container">
            <h1 class="feature-dev">
                DEMANDEZ UN NOUVEAU MOT DE PASSE
            </h1>

            <p class="forgot-text">
                Renseignez votre email pour recevoir un code de vérification permettant de modifier votre mot de passe.
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
                            :disabled="false"
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
    import iziToast from '../mixins/iziToast';
    import HeaderSign from '../HeaderSign/HeaderSign'

    export default {
        name: 'ForgotPassword',
        mixins: [iziToast],
        data: () => ({
            valid: true,
            email: '',
            emailRules: [
                v => !!v || 'Votre E-mail est requis',
                v => /.+@.+\..+/.test(v) || 'Votre E-mail doit être valide',
            ],
            token: '',
        }),
        methods: {
            formSubmit: function() {
                this.$refs.form.validate();
                this.axios
                    .post('http://localhost:3000/api/v1/auth/forgot-password', {
                        email: this.email
                    })
                    .then(response => {
                        this.token = response.data.token;
                        this.$cookie.set('token', JSON.stringify(this.token), 1);
                        this.$toast.success('Un email avec un code de vérification pour modifier votre mot de passe vient de vous être envoyé !', 'Succès !', this.notificationSystem.options.success);
                        setTimeout(() => {
                            this.$router.push({ path: `/recover-password` });
                        }, 100)
                    })
                    .catch(error => {
                        if(error.response.status == 404) {
                            this.$toast.error('Merci de renseigner un email existant !', 'Email non reconnu !', this.notificationSystem.options.error)
                        } else {
                            this.$toast.error('Une erreur est survenue !', 'Oups !', this.notificationSystem.options.error)
                        }
                    })
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