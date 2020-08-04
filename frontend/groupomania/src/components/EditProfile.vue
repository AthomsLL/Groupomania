<template>

    <div>
        <main-header/>
        <div class="container">
            <div class="avatar-container">
                <avatar-preview :file="file" @getFile="file = $event"/>
            </div>

            <v-form class="form" ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="firstname"
                    :rules="firstnameRules"
                    :counter="30"
                    label="Prénom"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="lastname"
                    :rules="lastnameRules"
                    :counter="30"
                    label="Nom"
                    required
                ></v-text-field>

                <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Votre département est requis']"
                    label="Département dans l'entreprise"
                    required
                ></v-select>

                <v-btn
                    
                    type="submit"
                    @click.prevent="formSubmit()">
                        Enregistrer
                </v-btn>
            </v-form>

            <p>{{ userId }}</p>
            <p>{{  file.name }}</p>
        </div>
    </div>

</template>

<script>
    import { getToken } from '../../helpers/decode';
    import Header from './Header';
    import AvatarPreview from './AvatarPreview';

    export default {
        name: 'EditProfile',
        data: () => ({
            valid: true,
            userId: '',
            file: '',
            firstname: '',
            firstnameRules: [
                v => !!v || 'Votre prénom est requis ',
                v => v.length <= 30 || 'Votre prénom doit contenir moins de 30 caractères'
            ],
            lastname: '',
            lastnameRules: [
                v => !!v || 'Votre nom est requis ',
                v => v.length <= 30 || 'Votre nom doit contenir moins de 30 caractères'
            ],
            select: null,
            items: [
                'Comptabilité',
                'Informatique',
                'Marketing',
                'Communication',
                'Logistique',
            ],
        }),
        created() {
            const user = getToken();
            this.userId = user.id;
        },
        methods: {
            formSubmit: function() {
                this.$refs.form.validate();
            }
        }, 
        components: {
            'avatar-preview': AvatarPreview,
            'main-header': Header
        }
    }

</script>

<style scoped lang="scss">

    .container {
        margin-top: 40px;
        padding: 0 30px;
        text-align: center;
    }

    .avatar-container {
        margin: 0 auto;
        width: 150px;        
    }

    .form {
        margin-top: 50px;
    }

    .v-btn {
        background-color: #FE421A !important;
        color: #fff;
        font-size: 20px;
        margin-top: 150px;
    }

</style>

