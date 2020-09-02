<template>
    <div>
        <main-header />

        <div class="container">
            <v-form ref="form" v-model="valid" lazy-validation>
                <div class="post-header-title">
                    <v-avatar size="52" class="avatar pointer" @click="goToMyProfile()">
                        <v-img :src="postDatas.avatar"></v-img>
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
                    <h3 class="post-content-title">
                        Exprimez-vous :
                    </h3>

                    <v-textarea
                        v-model="content"
                        placeholder="Que voulez-vous dire ?"
                        :rules="contentRules"
                        hint="Entre 3 et 250 caractères"
                        required
                    ></v-textarea>
                </div>

                <div class="cta-row">
                    <div class="cta-submit-post">
                        <v-btn class="fc-white" color="#F44336" large type="submit" @click.prevent="formSubmit()">
                            Modifier
                        </v-btn>
                    </div>

                    <div class="cta-cancel">
                        <v-btn color="#F44336" outlined large type="button" @click="goToPosts()">
                            Annuler
                        </v-btn>
                    </div>
                </div>

            </v-form>
        </div>
    </div>
</template>

<script>
    import Header from './Header';
    import AttachmentPreview from './AttachmentPreview';
    import { getToken } from '../../helpers/decode';

    export default {
        name: 'EditPost',
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
                postIdParams: '',
                postDatas: '',
                content: '',
                contentRules: [
                    v => !!v || 'Un contenu est requis ',
                    v => v.length <= 250 || 'Votre contenu doit contenir moins de 250 caractères'
                ],
                title: '',
                titleRules: [
                    v => !!v || 'Le titre du post est requis ',
                    v => v.length <= 50 || 'Votre titre doit contenir moins de 50 caractères'
                ],
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;
            this.isAdmin = user.isAdmin;
            this.postIdParams = this.$route.params.postId;

            this.getOnePost();
        },
        methods: {
            getOnePost: function() {
                this.axios
                    .get(`http://localhost:3000/api/v1/posts/${this.postIdParams}`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        }
                    })
                    .then(response => {
                        this.postDatas = response.data;
                        this.title = this.postDatas.title;
                        this.content = this.postDatas.content;
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

                                    console.log(this.results);
                                    console.log(this.urlAttachment);
                                    console.log(this.attachmentPublicId);

                                    this.axios
                                    .put(`http://localhost:3000/api/v1/posts/${this.postIdParams}`, {
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
                                        const post = response.data;
                                        console.log(post);

                                        this.$router.push({ path: `/` });
                                    })
                                    .catch(error => {
                                        this.errors.push(error);
                                        console.log(this.errors[0]);

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
                    .put(`http://localhost:3000/api/v1/posts/${this.postIdParams}`, {
                        title: this.title,
                        content: this.content,
                        UserId: this.userId
                    }, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })
                    .then(response => {
                        const post = response.data;
                        console.log(post);

                        this.$router.push({ path: `/` });
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

<style scoped lang="scss">
    .container {
        padding-left: 20px;
        padding-right: 20px;
    }

    .avatar {
        margin-right: 20px;
    }

    .post-header-title {
        display: flex;
        align-items: flex-end;
    }

    .attachment-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .attachment-title {
        font-size: 21px;
    }

    .attachment-preview-container {
        height: 100px;
        width: 100px;
    }

    .post-content-title {
        font-weight: 500;
    }

    .cta-row {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
    }

    .fc-white {
        color: #fff;
    }
</style>