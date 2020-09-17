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

    export default {
        name: 'UserComments',
        props: ['comments'],
        data() {
            return {
                userId: '',
                token: '',
            }
        },
        created() {
            
        },
        methods: {
            
        }
    }

</script>

<style scoped src="./UserComments.css">

</style>
