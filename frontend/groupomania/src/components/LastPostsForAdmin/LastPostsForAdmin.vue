<template>
    <div>
        <div class="container">
            <div v-if="posts.length > 0">
                <div v-for="post in posts" :key="post.id" justify="center">
                    <v-card class="mx-auto mb-3 card elevation-2" @click="goToOnePost(post.id)">
                        <v-card-text class="created-at">
                            Publié {{ post.createdAt | moment("from") }}
                        </v-card-text>

                        <v-container class="post-container">
                            <v-row>
                                <v-col cols="auto" class="col-content">
                                    <div class="content-box">
                                        <v-img
                                            class="post-img"
                                            v-if="post.attachment != null"
                                            height=100%
                                            width=100%
                                            :src="post.attachment"
                                        ></v-img>

                                        <p class="post-content" v-else-if="post.content != null">
                                            {{ post.content }}
                                        </p>
                                    </div>
                                </v-col>

                                <v-col cols="auto" class="text-center icons">
                                    <v-row class="flex-column">
                                            <div class="like" v-if="post.liked == false">
                                                <v-icon>mdi-heart</v-icon>
                                                <p>{{ post.nbLikes }}</p>
                                            </div>
                                            <div class="like" v-else>
                                                <v-icon color="#FE421A">mdi-heart</v-icon>
                                                <p>{{ post.nbLikes }}</p>
                                            </div>
                                        
                                            <div class="comments">
                                                <v-icon>mdi-chat</v-icon>
                                                <p class="mb-0">{{ post.nbComments }}</p>
                                            </div>
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

                <v-pagination
                    v-model.lazy="page"
                    :length="totalPages"                
                ></v-pagination>
            </div>

            <div v-else class="unfortunately">
                <p>Désolé, aucun post à afficher pour le moment.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { getToken } from '../../../helpers/decode';

    export default {
        name: 'LastPostsForAdmin',
        data() {
            return {
                token: '',
                userId: '',
                page: 1,
                currentPage: '',
                totalPages: '',
                totalPosts: '',
                posts: [],
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;

            this.getAllPosts();
        },
        watch: {
            page: function (value) {
                this.page = value;
                this.getAllPosts();
            }
        },
        methods: {
            getAllPosts: function() {
                this.axios
                    .get(`http://localhost:3000/api/v1/posts?page=${this.page - 1}`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        }
                    })
                    .then(response => {
                        this.posts = response.data.posts;
                        this.totalPosts = response.data.totalPosts;
                        this.totalPages = parseInt(response.data.totalPages, 10);
                        this.currentPage = response.data.currentPage;
                    })
                    .catch(error  => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/login` })
                        }

                        console.log(error);
                    });
            },
            goToOnePost: function(postId) {
                this.$router.push({ path: `/post/${postId}` });
            },
        }
    }
</script>

<style scoped src="./LastPostsForAdmin.css">
    
</style>