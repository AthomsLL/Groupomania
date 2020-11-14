<template>
    <div>
        <main-header />

        <div class="container">
            <v-form ref="form" v-model="valid" lazy-validation>
                <div class="post-header-title">
                    <v-avatar size="52" class="avatar pointer" @click="goToMyProfile()">
                        <v-img :src="userDatas.avatar"></v-img>
                    </v-avatar>

                    <v-text-field
                        v-model="title"
                        :rules="titleRules"
                        label="Titre du Post"
                        prepend-icon="mdi-pencil"
                        required
                    ></v-text-field>
                </div>

                <div class="attachment-container mt-2">
                    <h2 class="attachment-title mb-2">Ajouter une image</h2>
                    
                    <div class="attachment-preview-container">
                        <attachment-preview :file="file" @getFile="file = $event"/>
                    </div>
                </div>

                <div class="post-content mt-6">
                    <label for="content" class="post-content-title">Exprimez-vous :</label>
                    <v-textarea
                        v-model="content"
                        id="content"
                        placeholder="Que voulez-vous dire ?"
                        :counter="250"
                        :rules="contentRules"
                        hint="Entre 3 et 250 caractères"
                        required
                    ></v-textarea>
                </div>

                <div class="cta-row">
                    <div class="cta-create-post">
                        <v-btn class="fc-white" color="#EA1C04" large type="submit" @click.prevent="formSubmit()">
                            Publier
                        </v-btn>
                    </div>

                    <div class="cta-cancel">
                        <v-btn  color="#EA1C04" outlined large type="button" @click="goToPosts()">
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
    import Header from '../Header/Header';
    import AttachmentPreview from '../AttachmentPreview/AttachmentPreview';
    import { getToken } from '../../../helpers/decode';

    export default {
        name: 'CreatePost',
        mixins: [iziToast],
        data() {
            return {
                valid: true,
                file: '',
                preset: 'groupomania-attachments',
                cloudName: 'djcmfi03h',
                results: null,
                errors: [],
                urlAttachment: '',
                attachmentPublicId: '',
                token: '',
                userId: '',
                isAdmin: '',
                userDatas: '',
                content: '',
                contentRules: [
                    v => !!v || 'Un contenu est requis ',
                    v => v.length <= 250 || 'Votre contenu doit contenir moins de 250 caractères'
                ],
                title: '',
                titleRules: [
                    v => !!v || 'Le titre du post est requis ',
                    v => v.length <= 75 || 'Votre titre doit contenir moins de 75 caractères'
                ],
                post: '',
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;
            this.isAdmin = user.isAdmin;

            this.getUserMe();
        },
        methods: {
            getUserMe: function() {
                this.axios
                    .get(`http://localhost:3000/api/v1/users/${this.userId}`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        }
                    })
                    .then(response => {
                        this.userDatas = response.data;
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
                                    this.urlAttachment = this.results.secure_url;
                                    this.attachmentPublicId = this.results.public_id;

                                    this.axios
                                        .post(`http://localhost:3000/api/v1/posts`, {
                                            title: this.title,
                                            content: this.content,
                                            attachment: this.urlAttachment,
                                            attachmentPublicId: this.attachmentPublicId,
                                            UserId: this.userId
                                        }, {
                                            headers: {
                                                Authorization: `Bearer ${this.token}`
                                            }
                                        })
                                        .then(response => {
                                            this.post = response.data;
                                            this.$toast.success('Post créé avec succès !', 'OK', this.notificationSystem.options.success);
                                            setTimeout(() => {
                                                this.$router.push({ path: `/` });
                                            }, 100)
                                        })
                                        .catch(error => {
                                            this.errors.push(error);

                                            this.$toast.error('Impossible de créer le post !', 'Oups', this.notificationSystem.options.error);

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
                        .post(`http://localhost:3000/api/v1/posts`, {
                            title: this.title,
                            content: this.content,
                            UserId: this.userId
                        }, {
                            headers: {
                                Authorization: `Bearer ${this.token}`
                            }
                        })
                        .then(response => {
                            this.post = response.data;
                            this.$toast.success('Post créé avec succès !', 'OK', this.notificationSystem.options.success);
                            setTimeout(() => {
                                this.$router.push({ path: `/` });
                            }, 100)
                        })
                        .catch(error => {
                            this.errors.push(error);
                            this.$toast.error('Impossible de créer le post !', 'Oups', this.notificationSystem.options.error);
                        })
                }
            },
            prepareFormData: function() {
                this.formData = new FormData();
                this.formData.append("upload_preset", this.preset);
                this.formData.append("file", this.fileContents);
            },
            goToMyProfile: function() {
                this.$router.push({ path: `/user/profile/${this.userId}`});
            },
            goToPosts: function() {
                this.$router.push({ path: '/' });
            }
        },
        components: {
            'main-header': Header,
            'attachment-preview': AttachmentPreview,
        }
    }
</script>

<style scoped src="./CreatePost.css">

</style>