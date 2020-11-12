<template>
    <div>
        <main-header />

        <div class="container">
            <div class="header-searchbar">
                <div class="search">
                    <label for="search" class="label">Rechercher</label>
                    <input type="text" id="search" v-model="search" placeholder="Rechercher des posts"/>
                    <v-icon color="#EA1C04">mdi-magnify</v-icon>
                </div>
            </div>

            <div v-if="posts.length > 0">
                <div v-for="post in filteredPosts" :key="post.id" justify="center">
                    <v-card class="mx-auto mb-3 card elevation-2">
                        <div class="moment">
                            <v-card-text class="created-at">
                                Publié {{ post.createdAt | moment("from") }}
                            </v-card-text>

                            <v-menu v-if="userId === post.userId">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-on="on" v-bind="attrs" aria-label="more options">
                                        <v-icon size="24px">mdi-dots-horizontal</v-icon>
                                    </v-btn>
                                </template>

                                <v-list>
                                    <v-list-item @click="goToEditPost(post.id)">
                                        <v-icon left>mdi-pencil</v-icon>
                                        <v-list-item-title>Modifier le Post</v-list-item-title>
                                    </v-list-item>
                                    <v-dialog v-model="dialog" max-width="700">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-list-item v-bind="attrs" v-on="on">
                                                <v-icon left>mdi-delete-forever-outline</v-icon>
                                                <v-list-item-title>Supprimer le Post</v-list-item-title>
                                            </v-list-item>
                                        </template>
                                        <v-card>
                                            <v-card-title class="headline">Êtes-vous sûr(e) de vouloir supprimer ce post ?</v-card-title>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="red darken-1" text @click="dialog = false">Annuler</v-btn>
                                                <v-btn color="red darken-1" text @click="deletePost(post.id)">Supprimer</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-list>
                            </v-menu>

                            <v-menu v-else-if="isAdmin === true">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-on="on" v-bind="attrs" aria-label="more options">
                                        <v-icon size="24px">mdi-dots-horizontal</v-icon>
                                    </v-btn>
                                </template>

                                <v-list>
                                    <v-dialog v-model="dialog" max-width="700">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-list-item v-bind="attrs" v-on="on">
                                                <v-icon left>mdi-delete-forever-outline</v-icon>
                                                <v-list-item-title>Supprimer le Post</v-list-item-title>
                                            </v-list-item>
                                        </template>
                                        <v-card>
                                            <v-card-title class="headline">Êtes-vous sûr(e) de vouloir supprimer ce post ?</v-card-title>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="red darken-1" text @click="dialog = false">Annuler</v-btn>
                                                <v-btn color="red darken-1" text @click="deletePost(post.id)">Supprimer</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-list>
                            </v-menu>
                        </div>

                        <v-container class="post-container">
                            <v-row>
                                <v-col cols="auto" class="col-content pointer" @click="goToOnePost(post.id)">
                                    <div class="content-box">
                                        <v-img
                                            class="post-img"
                                            v-if="post.attachment != null"
                                            height=100%
                                            width=100%
                                            :src="post.attachment"
                                        ></v-img>

                                        <p class="post-content" v-if="post.content != null">
                                            {{ post.content }}
                                        </p>
                                    </div>
                                </v-col>

                                <v-col cols="auto" class="text-center icons">
                                    <v-row class="flex-column">
                                            <div class="like pointer" v-if="post.liked == false" @click="toggleLike(post)">
                                                <v-icon>mdi-heart</v-icon>
                                                <p>{{ post.nbLikes }}</p>
                                            </div>
                                            <div class="like pointer" v-else @click="toggleLike(post)">
                                                <v-icon color="#EA1C04">mdi-heart</v-icon>
                                                <p>{{ post.nbLikes }}</p>
                                            </div>
                                        
                                            <div class="comments pointer" @click="goToOnePost(post.id)">
                                                <v-icon>mdi-chat</v-icon>
                                                <p class="mb-0">{{ post.nbComments }}</p>
                                            </div>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>

                        <v-list-item>
                            <v-list-item-avatar size="52" class="avatar pointer" @click="goToUserProfile(post.username)">
                                <v-img :src="post.avatar"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content class="content">
                                <v-list-item-title class="headline pointer" @click="goToOnePost(post.id)">{{ post.title }}</v-list-item-title>
                                <v-list-item-subtitle class="username pointer" @click="goToUserProfile(post.username)">Par {{ post.username }}</v-list-item-subtitle>
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

        <footer-menu :userId="userId" />

        <create-post-button />
    </div>
</template>

<script>

    import Header from '../Header/Header';
    import FooterMenu from '../FooterMenu/FooterMenu';
    import CreatePostButton from '../CreatePostButton/CreatePostButton';
    import { getToken } from '../../../helpers/decode';

    export default {
        name: 'Posts',
        data() {
            return {
                token: '',
                userId: '',
                isAdmin: '',
                dialog: false,
                isLiked: '',
                posts: [],
                page: 1,
                currentPage: '',
                totalPages: '',
                totalPosts: '',
                search: '',
                notificationSystem: {
                    options: {
                        success: {
                            position: "bottomCenter",
                        },
                        error: {
                            position: "bottomCenter",
                        }
                    }
                }
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;
            this.isAdmin = user.isAdmin;

            this.getAllPosts();
        },
        watch: {
            page: function (value) {
                this.page = value;
                this.getAllPosts();
            }
        },
        computed: {
            filteredPosts: function() {
                return this.posts.filter((post) => {
                    return post.title.match(this.search) || 
                           post.username.match(this.search);
                });
            },
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
            goToUserProfile: function(username) {
                this.$router.push({ path: `/user/${username}`})
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
                        this.$toast.success('Post supprimé avec succès !', 'OK', this.notificationSystem.options.success);
                        this.getAllPosts();
                    })
                    .catch(error  => {
                        this.$toast.error('Impossible de supprimer le post !', 'Oups', this.notificationSystem.options.error);
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
                            this.getAllPosts();
                        })
                        .catch(error  => {
                            if(error.response.status == 403) {
                                this.$toast.error('Vous avez déjà liké ce Post !', 'Oups', this.notificationSystem.options.error);
                            }

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
                            this.getAllPosts();
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
        },
        components: {
            'main-header': Header,
            'footer-menu': FooterMenu,
            'create-post-button': CreatePostButton,
        }
    }
</script>

<style scoped src="./Posts.css">

</style>