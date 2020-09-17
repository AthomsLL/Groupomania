<template>
    <div>
        <header-sign></header-sign>
        <div class="container">
            <p class="feature-dev">
                FEATURE EN COURS DE DEVELOPPEMENT
            </p>

            <p class="forgot-text">
                Vous pourrez renseigner votre nouveau mot de passe
            </p>

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="newPassword"
                    :rules="passwordRules"
                    label="Nouveau mot de passe"
                    type="password"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Confirmer mot de passe"
                    type="password"
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
    import HeaderSign from '../HeaderSign/HeaderSign'

    export default {
        name: 'RecoverPassword',
        data() {
            return {
                valid: true,
                newPassword: '',
                password: '',
                passwordRules: [
                    v => !!v || 'Votre mot de passe est requis',
                    v => (v && v.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v)) || 'Le mot de passe doit comporter au moins 8 caractères, dont au moins 1 minuscule, 1 majuscule et 1 chiffre'
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
        methods: {
            formSubmit: function() {
                if(this.newPassword === this.password) {
                    this.$refs.form.validate();
                } else {
                    this.$toast.error('Les deux mots de passe doivent correspondre', 'Oups', this.notificationSystem.options.error);
                }
            }
        },
        components: {
            'header-sign': HeaderSign
        }
    }

</script>

<style scoped src="./RecoverPassword.css">

</style>