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
        }),
        methods: {
            formSubmit: function() {
                this.$refs.form.validate();
                this.axios
                    .post('http://localhost:3000/api/v1/auth/forgot-password', {
                        email: this.email
                    })
                    .then(response => {
                        console.log(response);
                        this.$toast.success('Un email avec un lien de modification de mot de passe vient de vous être envoyé !', 'Succès !', this.notificationSystem.options.success);
                    })
                    .catch(error => {
                        console.log(error);
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