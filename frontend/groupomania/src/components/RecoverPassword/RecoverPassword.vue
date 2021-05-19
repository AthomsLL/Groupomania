<template>
    <div>
        <header-sign></header-sign>
        <div class="container">
            <h1 class="feature-dev">
                MODIFIEZ VOTRE MOT DE PASSE
            </h1>

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                    <v-text-field
                        v-model="resetCode"
                        :rules="resetCodeRules"
                        label="Code de vérification"
                        required
                    ></v-text-field>
                </v-row>

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
                        v-model="password"
                        :rules="passwordRulesConf"
                        label="Confirmer mot de passe"
                        :type="passwordFieldType2"
                        required
                    ></v-text-field>

                    <v-btn class="eye mb-0" icon v-if="passwordFieldType2 === 'password'" @click="toggleShowPassword2()" aria-label="eye icon"><v-icon>mdi-eye</v-icon></v-btn>
                    <v-btn class="eye mb-0" icon v-if="passwordFieldType2 != 'password'" @click="toggleShowPassword2()" aria-label="eye-off icon"><v-icon>mdi-eye-off</v-icon></v-btn>
                </v-row>

                <v-btn
                    class="cta-confirm"
                    type="submit"
                    @click.prevent="formSubmit">
                        Confirmer
                </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
    import iziToast from '../mixins/iziToast';
    import HeaderSign from '../HeaderSign/HeaderSign';
    import { getToken} from '../../../helpers/decode';

    export default {
        name: 'RecoverPassword',
        mixins: [iziToast],
        data() {
            return {
                valid: true,
                newPassword: '',
                password: '',
                passwordRules: [
                    v => !!v || 'Votre mot de passe est requis',
                    v => (v && v.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v)) || 'Le mot de passe doit comporter au moins 8 caractères, dont au moins 1 minuscule, 1 majuscule et 1 chiffre'
                ],
                passwordRulesConf: [
                    v => !!v || 'Votre mot de passe est requis',
                    v => (v && v.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v)) || 'Le mot de passe doit comporter au moins 8 caractères, dont au moins 1 minuscule, 1 majuscule et 1 chiffre',
                    v => (v && this.newPassword === this.password)  || 'Les mots de passe ne correspondent pas',
                ],
                passwordFieldType1: 'password',
                passwordFieldType2: 'password',
                resetCode: '',
                resetCodeRules: [
                    v => !!v || 'Le code de vérification est requis',
                    v => (v && v.length <= 6 && /^[0-9]+$/.test(v)) || 'Le code de vérification ne doit comporter que 6 chiffres maximum'
                ],
                token: '',
                userResetCode: '',
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userResetCode = user.resetCode;
        },
        methods: {
            formSubmit: function() {
                if(this.resetCode != this.userResetCode) {
                    this.$toast.error('Le code de vérification n\'est pas celui que vous avez reçu par email !', 'Oups', this.notificationSystem.options.error);
                } 
                else if(this.newPassword != this.password) {
                    this.$toast.error('Les deux mots de passe doivent correspondre', 'Oups', this.notificationSystem.options.error);
                } 
                else if(this.newPassword == this.password && this.resetCode == this.userResetCode) {
                    this.$refs.form.validate();
                    this.axios
                        .post('http://localhost:3000/api/v1/auth/reset-password', {
                            password: this.newPassword,
                            resetCode: this.resetCode
                        })
                        .then(() => {
                            this.$toast.success('Votre nouveau mot de passe a été enregistré avec succès, vous pouvez vous connecter de nouveau !', 'Succès !', this.notificationSystem.options.success);
                            this.$cookie.delete('token');
                            setTimeout(() => {
                                this.$router.push({ path: `/login` });
                            }, 300)
                        })
                        .catch((error) => {
                            if(error.response.status == 403) {
                                this.$toast.error('Vous n\'avez pas l\'autorisation de modifier ce mot de passe !', 'Non autorisé !', this.notificationSystem.options.error)
                            } else {
                                this.$toast.error('Une erreur est survenue !', 'Oups !', this.notificationSystem.options.error)
                            }
                        })
                } else {
                    this.$toast.error('Une erreur est survenue !', 'Oups', this.notificationSystem.options.error);
                }
            },
            toggleShowPassword1: function() {
                this.passwordFieldType1 = this.passwordFieldType1 === 'password' ? 'text' : 'password';
            },
            toggleShowPassword2: function() {
                this.passwordFieldType2 = this.passwordFieldType2 === 'password' ? 'text' : 'password';
            },
        },
        components: {
            'header-sign': HeaderSign
        }
    }

</script>

<style scoped src="./RecoverPassword.css">

</style>