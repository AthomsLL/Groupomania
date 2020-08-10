<template>
    <div>
        <div class="container">
            <div v-if="posts.length > 0">
                <div v-for="post in posts" :key="post.id">
                    <v-card class="mx-auto mb-3 card">
                        <v-card-text class="created-at">
                            Publié {{ post.createdAt | moment("from") }}
                        </v-card-text>

                        <v-container class="post-container">
                            <v-row>
                                <v-col cols="auto">
                                    <v-img
                                        v-if="post.attachment != null"
                                        height="230"
                                        width="230"
                                        :src="post.attachment"
                                    ></v-img>

                                    <p class="post-content" v-else-if="post.content != null">
                                        {{ post.content }}
                                    </p>
                                </v-col>

                                <v-col cols="auto" class="text-center">
                                    <v-row class="flex-column">
                                        <v-col class="px-0">
                                            <div class="like" v-if="post.liked == false">
                                                <v-icon>mdi-heart</v-icon>
                                                <p>{{ post.nbLikes }}</p>
                                            </div>
                                            <div class="like" v-else>
                                                <v-icon color="#FE421A">mdi-heart</v-icon>
                                                <p>{{ post.nbLikes }}</p>
                                            </div>
                                        </v-col>

                                        <v-col class="px-0">
                                            <div class="comments">
                                                <v-icon>mdi-chat</v-icon>
                                                <p>{{ post.nbComments }}</p>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>

                        <v-list-item>
                            <v-list-item-avatar size="52" class="avatar">
                                <v-img :src="post.avatar"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content class="content">
                                <v-list-item-title class="headline">{{ post.title }}</v-list-item-title>
                                <v-list-item-subtitle class="username">Par {{ post.username }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </div>
            </div>

            <div v-else class="unfortunately">
                <p>Désolé, aucun post à afficher pour le moment.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { getToken } from '../../helpers/decode';
    import axios from 'axios'

    export default {
        name: 'UserPosts',
        data() {
            return {
                token: '',
                userId: '',
                posts: [],
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;

            this.getAllPostsOfUser();
        },
        methods: {
            getAllPostsOfUser: function() {
                axios
                .get(`http://localhost:3000/api/v1/posts/users/${this.userId}`, {
                    headers: {
                        Authorization: "Bearer " + this.token,
                    }
                })
                .then(response => {
                    console.log(response.data);
                    this.posts = response.data;
                })
                .catch(error => console.log(error));
            }
        },
    }
</script>

<style scoped lang="scss">

    v-card {
        margin-bottom: 10px !important;
    }

    .created-at {
        font-size: 17px;
        font-weight: 500;
        padding-bottom: 0;
    }

    .post-container {
        padding-top: 0;
        padding-bottom: 0;
    }

    .post-content {
        margin-top: 15px;
        width: 230px;
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

    .username {
        font-size: 15px;
    }

    .unfortunately {
        color: #F44336;
        font-size: 20px;
        font-weight: 500;
        margin-top: 20px;
        text-align: center;
    }
</style>