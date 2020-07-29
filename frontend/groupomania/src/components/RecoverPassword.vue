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
    import HeaderSign from './HeaderSign'
    import Swal from 'sweetalert2'

    export default {
        name: 'ForgotPassword',
        data: () => ({
            valid: true,
            newPassword: '',
            password: '',
            passwordRules: [
                v => !!v || 'Votre mot de passe est requis',
                v => (v && v.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v)) || 'Le mot de passe doit comporter au moins 8 caractères, dont au moins 1 minuscule, 1 majuscule et 1 chiffre'
            ],
        }),
        methods: {
            formSubmit() {
                if(this.newPassword === this.password) {
                    this.$refs.form.validate();
                } else {
                    Swal.fire("Une erreur s'est produite...", 'Les deux mots de passe doivent correspondre !', 'error')
                }
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
            margin-top: 200px;
        }
    }

</style>