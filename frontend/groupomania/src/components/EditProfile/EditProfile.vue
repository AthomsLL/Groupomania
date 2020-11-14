<template>

    <div>
        <main-header/>
        
        <div class="container">
            <div class="avatar-container">
                <avatar-preview :file="file" @getFile="file = $event"/>
            </div>

            <v-form class="form" ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="firstName"
                    :rules="firstNameRules"
                    :counter="30"
                    label="Prénom"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="lastName"
                    :rules="lastNameRules"
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

            <v-btn class="cta-cancel" type="button" outlined color="#EA1C04" @click.prevent="goToProfile()">
                Annuler
            </v-btn>
        </div>
    </div>

</template>

<script>
    import iziToast from '../mixins/iziToast';
    import { getToken } from '../../../helpers/decode';
    import Header from '../Header/Header';
    import AvatarPreview from '../AvatarPreview/AvatarPreview';

    export default {
        name: 'EditProfile',
        mixins: [iziToast],
        data() {
            return {
                valid: true,
                userId: '',
                username: '',
                userDatas: '',
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
                department: null,
                items: [
                    'Comptabilité',
                    'Informatique',
                    'Marketing',
                    'Communication',
                    'Logistique',
                    'Caissier(e)',
                    'Hôte(esse) Accueil',
                    'Magasinier(e)'
                ],
                file: '',
                preset: 'groupomania-avatars',
                cloudName: 'djcmfi03h',
                results: null,
                errors: [],
                urlAvatar: '',
                avatarPublicId: '',
                token: '',
                profile: '',
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;
            this.username = user.username;

            this.getInfosUserMe();
        },
        methods: {
            getInfosUserMe: function() {
                let infosUserObj = {
                    url: `http://localhost:3000/api/v1/users/${this.userId}`,
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    }
                };

                this.axios(infosUserObj)
                    .then(response => {
                        this.userDatas = response.data;
                        this.firstName = this.userDatas.firstName;
                        this.lastName = this.userDatas.lastName;
                        this.department = this.userDatas.department;
                    })
                    .catch(error  => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/login` })
                        }

                        console.log(error);
                    });
            },
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
                            this.axios(requestObj)
                                .then(response => {
                                    this.results = response.data;
                                    this.urlAvatar = this.results.secure_url;
                                    this.avatarPublicId = this.results.public_id;

                                    this.axios
                                    .put(`http://localhost:3000/api/v1/users/${this.userId}`, {
                                        firstName: this.firstName,
                                        lastName: this.lastName,
                                        department: this.department,
                                        avatar: this.urlAvatar,
                                        avatarPublicId: this.avatarPublicId
                                    }, {
                                        headers: {
                                            Authorization: `Bearer ${this.token}`
                                        }
                                    })
                                    .then(response => {
                                        this.profile = response.data;
                                        this.$toast.success('Profil mis à jour avec succès !', 'OK', this.notificationSystem.options.success);
                                        setTimeout(() => {
                                            this.$router.push({ path: `/user/profile/${this.userId}` });
                                        }, 100)
                                    })
                                    .catch(error => {
                                        this.errors.push(error);
                                        console.log(this.errors[0]);
                                        this.$toast.error('Impossible de mettre à jour le profil !', '', this.notificationSystem.options.error);

                                        if (error.response.status == 401) {
                                            this.$cookie.delete('token');
                                            this.$router.push({ path: `/login` })
                                        }
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
                    this.axios
                        .put(`http://localhost:3000/api/v1/users/${this.userId}`, {
                            firstName: this.firstName,
                            lastName: this.lastName,
                            department: this.department,
                        }, {
                            headers: {
                                Authorization: `Bearer ${this.token}`
                            }
                        })
                        .then(response => {
                            this.profile = response.data;
                            this.$toast.success('Profil mis à jour avec succès !', 'OK', this.notificationSystem.options.success);
                            setTimeout(() => {
                                this.$router.push({ path: `/user/profile/${this.userId}` });
                            }, 100)
                        })
                        .catch(error => {
                            this.errors.push(error);
                            console.log(this.errors[0]);
                            this.$toast.error('Impossible de mettre à jour le profil !', '', this.notificationSystem.options.error);
                        })
                }
            },
            prepareFormData: function() {
                this.formData = new FormData();
                this.formData.append("upload_preset", this.preset);
                this.formData.append("file", this.fileContents);
            },
            goToProfile: function() {
                this.$router.push({ path: `/user/profile/${this.userId}` });
            }
        }, 
        components: {
            'avatar-preview': AvatarPreview,
            'main-header': Header
        }
    }

</script>

<style scoped src="./EditProfile.css">

</style>

