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
                    v-model="department"
                    :items="items"
                    :rules="[v => !!v || 'Votre département est requis']"
                    label="Département dans l'entreprise"
                    required
                ></v-select>

                <v-btn class="cta-submit-profile"  type="submit" @click.prevent="formSubmit()">
                    Enregistrer
                </v-btn>
            </v-form>

            <v-btn class="cta-cancel" type="button" outlined color="#F44336" @click.prevent="goToProfile()">
                Annuler
            </v-btn>
        </div>
    </div>

</template>

<script>
    import { getToken } from '../../helpers/decode';
    import Header from './Header';
    import AvatarPreview from './AvatarPreview';
    import axios from 'axios';

    export default {
        name: 'EditProfile',
        data() {
            return {
                valid: true,
                userId: '',
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
                department: null,
                items: [
                    'Comptabilité',
                    'Informatique',
                    'Marketing',
                    'Communication',
                    'Logistique',
                ],
                file: '',
                preset: 'groupomania-avatars',
                cloudName: 'djcmfi03h',
                results: null,
                errors: [],
                urlAvatar: '',
                avatarPublicId: '',
                token: ''
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;
        },
        methods: {
            formSubmit: function() {
                this.$refs.form.validate();
                if (this.file) {
                    let reader = new FileReader();
                    reader.addEventListener(
                        "load", 
                        function() {
                            this.fileContents = reader.result;
                            this.prepareFormData();
                            let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
                            let requestObj = {
                                url: cloudinaryUploadURL,
                                method: "POST",
                                data: this.formData,
                            };
                            axios(requestObj)
                                .then(response => {
                                    this.results = response.data;
                                    this.urlAvatar = this.results.secure_url;
                                    this.avatarPublicId = this.results.public_id;

                                    console.log(this.results);
                                    console.log(this.urlAvatar);
                                    console.log(this.avatarPublicId);

                                    axios
                                    .put(`http://localhost:3000/api/v1/users/${this.userId}`, {
                                        firstName: this.firstname,
                                        lastName: this.lastname,
                                        department: this.department,
                                        avatar: this.urlAvatar,
                                        avatarPublicId: this.avatarPublicId
                                    }, {
                                        headers: {
                                            Authorization: `Bearer ${this.token}`
                                        }
                                    })
                                    .then(response => {
                                        const profile = response.data;
                                        console.log(profile);

                                        this.$router.push({ path: '/user/profile' });
                                    })
                                    .catch(error => {
                                        this.errors.push(error);
                                        console.log(this.errors[0]);
                                    })
                                })
                                .catch(error => {
                                    this.errors.push(error);
                                    console.log(this.errors[0]);
                                })
                        }.bind(this), false
                    );
                    if (this.file && this.file.name) {
                        reader.readAsDataURL(this.file);
                    }
                } else {
                    axios
                    .put(`http://localhost:3000/api/v1/users/${this.userId}`, {
                        firstName: this.firstname,
                        lastName: this.lastname,
                        department: this.department,
                    }, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })
                    .then(response => {
                        const profile = response.data;
                        console.log(profile);

                        this.$router.push({ path: '/user/profile' });
                    })
                    .catch(error => {
                        this.errors.push(error);
                        console.log(this.errors[0]);
                    })
                }
            },
            prepareFormData: function() {
                this.formData = new FormData();
                this.formData.append("upload_preset", this.preset);
                this.formData.append("file", this.fileContents);
            },
            goToProfile: function() {
                this.$router.push({ path: '/user/profile' });
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
        font-size: 20px;
    }

    .cta-submit-profile {
        background-color: #FE421A !important;
        color: #fff;
        margin-top: 150px;
    }

    .cta-cancel {
        margin-top: 15px;
    }

</style>

