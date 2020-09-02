<template>
    <div>
        <main-header />

        <div class="container">
            <v-card class="mx-auto mb-3 card elevation-2">
                <div class="moment">
                    <v-card-text class="created-at">
                        Publié {{ postDatas.createdAt | moment("from") }}
                    </v-card-text>

                    <v-menu v-if="userId === postDatas.userId">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-on="on" v-bind="attrs">
                                <v-icon size="24px">mdi-dots-horizontal</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item @click="goToEditPost(postDatas.id)">
                                <v-icon left>mdi-pencil</v-icon>
                                <v-list-item-title>Modifier le Post</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="deletePost(postDatas.id)">
                                <v-icon left>mdi-delete-forever-outline</v-icon>
                                <v-list-item-title>Supprimer le Post</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-menu v-if="isAdmin === true">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-on="on" v-bind="attrs">
                                <v-icon size="24px">mdi-dots-horizontal</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item @click="deletePost(postDatas.id)">
                                <v-icon left>mdi-delete-forever-outline</v-icon>
                                <v-list-item-title>Supprimer le Post</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>

                <v-container class="post-container">
                    <v-row>
                        <v-col cols="auto" class="col-content">
                            <div class="content-box">
                                <v-img
                                    class="post-img"
                                    v-if="postDatas.attachment != null"
                                    height=100%
                                    width=100%
                                    :src="postDatas.attachment"
                                ></v-img>

                                <p class="post-content" v-if="postDatas.content != null">
                                    {{ postDatas.content }}
                                </p>
                            </div>
                        </v-col>

                        <v-col cols="auto" class="text-center icons">
                            <v-row class="flex-column">
                                    <div class="like pointer" v-if="postDatas.liked == false" @click="toggleLike(postDatas)">
                                        <v-icon>mdi-heart</v-icon>
                                        <p>{{ postDatas.nbLikes }}</p>
                                    </div>
                                    <div class="like pointer" v-else @click="toggleLike(postDatas)">
                                        <v-icon color="#FE421A">mdi-heart</v-icon>
                                        <p>{{ postDatas.nbLikes }}</p>
                                    </div>
                                
                                    <div class="comments pointer">
                                        <v-icon>mdi-chat</v-icon>
                                        <p class="mb-0">{{ postDatas.nbComments }}</p>
                                    </div>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>

                <v-list-item>
                    <v-list-item-avatar size="52" class="avatar pointer" @click="goToUserProfile(postDatas.username)">
                        <v-img :src="postDatas.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content class="content">
                        <v-list-item-title class="headline">{{ postDatas.title }}</v-list-item-title>
                        <v-list-item-subtitle class="username pointer" @click="goToUserProfile(postDatas.username)">Par {{ postDatas.username }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <div class="comments-container">
                    <h3 class=" mt-3 mb-4 text-center comments-title">Commentaires :</h3>

                    <div v-if="comments.length > 0">
                        <v-card class="comment-card" v-for="comment in comments" :key="comment.id" justify="center">
                            <div class="comment-container">
                                <div class="comment-box">
                                    <v-list-item>
                                        <v-list-item-avatar size="52" class="avatar pointer" @click="goToUserProfile(comment.username)">
                                            <v-img :src="comment.avatar"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content class="content">
                                            <v-list-item-title class="headline username pointer" @click="goToUserProfile(comment.username)">{{ comment.username }}</v-list-item-title>
                                            <v-list-item-subtitle>{{ comment.createdAt | moment("from") }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>

                                    <div class="comment-likes text-center">
                                        <div class="like pointer" v-if="comment.liked == false" @click="toggleLikeComment(comment)">
                                            <v-icon>mdi-heart</v-icon>
                                            <p>{{ comment.nbLikes }}</p>
                                        </div>
                                        <div class="like pointer" v-else @click="toggleLikeComment(comment)">
                                            <v-icon color="#FE421A">mdi-heart</v-icon>
                                            <p>{{ comment.nbLikes }}</p>
                                        </div>
                                    </div>
                                </div>

                                <v-list-item class="comment-content">
                                    <p>{{ comment.content }}</p>
                                </v-list-item>
                            </div>
                            <div class="comment-menu">
                                <v-menu v-if="userId === comment.userId">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-on="on" v-bind="attrs">
                                            <v-icon size="24px">mdi-dots-horizontal</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item @click="confirmEditComment()">
                                            <v-icon left>mdi-pencil</v-icon>
                                            <v-list-item-title>Modifier le Commentaire</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item @click="confirmDeleteComment()">
                                            <v-icon left>mdi-delete-forever-outline</v-icon>
                                            <v-list-item-title>Supprimer le Commentaire</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>

                                <v-menu v-if="isAdmin === true">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-on="on" v-bind="attrs">
                                            <v-icon size="24px">mdi-dots-horizontal</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item @click="deletePost(comment.id)">
                                            <v-icon left>mdi-delete-forever-outline</v-icon>
                                            <v-list-item-title>Supprimer le Commentaire</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </div>
                        </v-card>
                    </div>

                    <div v-else class="unfortunately">
                        <p>Désolé, aucun commentaire à afficher pour le moment.</p>
                    </div>
                </div>
            </v-card>
        </div>

        <footer-menu />
    </div>
</template>

<script>
    import Header from './Header';
    import FooterMenu from './FooterMenu';
    import { getToken } from '../../helpers/decode';
    import swal from 'sweetalert2';

    export default {
        name: 'OnePost',
        data() {
            return {
                token: '',
                userId: '',
                isAdmin: '',
                isLiked: '',
                isCommentLiked: '',
                postIdParams: '',
                postDatas: '',
                comments: [],
                showComments : false,
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
                        this.getAllComments();
                    })
                    .catch(error  => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/login` })
                        }

                        console.log(error);
                    });
            },
            goToEditPost: function(postId) {
                this.$router.push({ path: `/edit-post/${postId}`});
            },
            deletePost: function(postId) {
                this.axios
                    .delete(`http://localhost:3000/api/v1/posts/${postId}`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        }
                    })
                    .then(() => {
                        swal.fire({
                            icon: 'success',
                            title: 'Post supprimé avec succès !',
                            timer: 1500
                        });
                        this.$router.push({ path: '/' });
                    })
                    .catch(error  => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/login` })
                        }

                        console.log(error);
                    });
            },
            toggleLike: function(post) {
                if (post.liked == false) {
                    this.axios
                        .post(`http://localhost:3000/api/v1/posts/${post.id}/likes`, {
                            UserId: post.userId,
                            PostId: post.id
                        }, {
                            headers: {
                                Authorization: "Bearer " + this.token,
                            }
                        })
                        .then(response => {
                            this.isLiked = response.data.liked;
                            this.getOnePost();
                        })
                        .catch(error  => {
                            if (error.response.status == 401) {
                                this.$cookie.delete('token');
                                this.$router.push({ path: `/login` })
                            }

                            console.log(error);
                        })
                } else {
                    this.axios
                        .delete(`http://localhost:3000/api/v1/posts/${post.id}/likes/${this.userId}`, {
                            headers: {
                                Authorization: "Bearer " + this.token,
                            }
                        })
                        .then(response => {
                            this.isLiked = response.data.liked;
                            this.getOnePost();
                        })
                        .catch(error  => {
                            if (error.response.status == 401) {
                                this.$cookie.delete('token');
                                this.$router.push({ path: `/login` })
                            }

                            console.log(error);
                        })
                }
            },
            toggleLikeComment: function(comment) {
                if (comment.liked == false) {
                    this.axios
                        .post(`http://localhost:3000/api/v1/posts/${comment.postId}/comments/${comment.id}/likes`, {
                            UserId: comment.userId,
                            CommentId: comment.id
                        }, {
                            headers: {
                                Authorization: "Bearer " + this.token,
                            }
                        })
                        .then(response => {
                            this.isCommentLiked = response.data.liked;
                            this.getOnePost();
                        })
                        .catch(error  => {
                            if (error.response.status == 401) {
                                this.$cookie.delete('token');
                                this.$router.push({ path: `/login` })
                            }

                            console.log(error);
                        })
                } else {
                    this.axios
                        .delete(`http://localhost:3000/api/v1/posts/${comment.postId}/comments/${comment.id}/likes/${this.userId}`, {
                            headers: {
                                Authorization: "Bearer " + this.token,
                            }
                        })
                        .then(response => {
                            this.isCommentLiked = response.data.liked;
                            this.getOnePost();
                        })
                        .catch(error  => {
                            if (error.response.status == 401) {
                                this.$cookie.delete('token');
                                this.$router.push({ path: `/login` })
                            }

                            console.log(error);
                        })
                }
            },
            getAllComments: function() {
                this.axios
                    .get(`http://localhost:3000/api/v1/posts/${this.postIdParams}/comments`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        }
                    })
                    .then(response => {
                        console.log(response.data);
                        this.comments = response.data;
                    })
                    .catch(error  => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/login` })
                        }

                        console.log(error);
                    });
            },
        },
        components: {
            'main-header': Header,
            'footer-menu': FooterMenu,
        }
    }
</script>

<style scoped lang="scss">

    .container {
        margin-bottom: 40px;
    }

    .moment {
        display: flex;
    }

    .created-at {
        font-size: 17px;
        font-weight: 500;
        padding: 8px 13px 0 13px;
    }

    .post-container {
        padding-top: 0;
        padding-bottom: 0;
    }

    .col-content {
        width: 80%;
    }

    .post-img {
        width: fit-content;
    }

    .post-content {
        margin-top: 15px;
    }

    .avatar {
        margin-top: 0;
        margin-right: 10px !important;
    }

    .content {
        padding-top: 0;
    }

    .headline {
        font-size: 20px !important;
    }

    .icons {
        display: flex;
        align-items: center;
        margin: 0 auto;
        padding-left: 0;
    }

    .username {
        font-size: 15px;
    }

    .comments-title {
        text-decoration: underline;
    }

    .comments-container .comment-card {
        border-radius: 0;
        display: flex;
        justify-content: space-between;
        padding-left: 16px;;
    }

    .comment-container {
        width: 90%;
    }

    .comment-box {
        display: flex;
        justify-content: space-between;
    }

    .like {
        padding: 15px 15px 0 15px;
    }

</style>