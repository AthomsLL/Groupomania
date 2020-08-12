<template>
    <div>
        <div class="container">
            <div v-if="comments.length > 0">
                <div v-for="comment in comments" :key="comment.id" justify="center">
                    <v-card class="mx-auto mb-3 card elevation-2">
                        <v-card-text class="created-at">
                            Publié {{ comment.postCreatedAt | moment("from") }}
                        </v-card-text>

                        <v-list-item>
                            <v-list-item-avatar size="52" class="avatar">
                                <v-img :src="comment.postUserAvatar"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content class="content">
                                <v-list-item-title class="headline">{{ comment.postTitle }}</v-list-item-title>
                                <v-list-item-subtitle class="username">Par {{ comment.postUserUsername }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-avatar size="52" class="avatar">
                                <v-img :src="comment.avatar"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content class="content pa-0 mt-3">
                                <div class="flex-row">
                                    <div>
                                        <p class="comment-username mb-1">{{ comment.username }}</p>
                                        <p class="comment-created mb-1">{{ comment.createdAt | moment("from") }}</p>
                                    </div>
                                    <div class="like" v-if="comment.liked == false">
                                        <v-icon>mdi-heart</v-icon>
                                        <p>{{ comment.nbLikes }}</p>
                                    </div>
                                    <div class="like" v-else>
                                        <v-icon color="#FE421A">mdi-heart</v-icon>
                                        <p>{{ comment.nbLikes }}</p>
                                    </div>
                                </div>
                                
                                <p>{{ comment.content }}</p>
                            </v-list-item-content>
                        </v-list-item>
                            
                    </v-card>
                </div>
            </div>

            <div v-else class="unfortunately">
                <p>Désolé, aucun commentaire à afficher pour le moment.</p>
            </div>
        </div>
    </div>
</template>
    
<script>
    import { getToken } from '../../helpers/decode';
    import axios from 'axios'

    export default {
        name: 'UserComments',
        data() {
            return {
                userId: '',
                token: '',
                comments: [],
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;

            this.getAllCommentsOfUser();
        },
        methods: {
            getAllCommentsOfUser: function() {
                axios
                .get(`http://localhost:3000/api/v1/comments/users/${this.userId}`, {
                    headers: {
                        Authorization: "Bearer " + this.token,
                    }
                })
                .then(response => {
                    console.log(response.data);
                    this.comments = response.data;
                })
                .catch(error => console.log(error));
            }
        }
    }

</script>

<style scoped lang="scss">

    .v-list-item:not(:last-child)::after {
        background-color: rgba(0,0,0,.3);
        content: "";
        display: block;
        position: absolute;
        left: 41px;
        top: 57px;
        width: 2px;
    }

    .created-at {
        font-size: 17px;
        font-weight: 500;
        padding-bottom: 0;
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

    .comment-username {
        font-size: 20px;
        color: #707070;
    }

    .flex-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: -10px;
    }

    .like {
        text-align: center;
    }
    
    .comment-created {
        color: #707070;
    }

</style>
