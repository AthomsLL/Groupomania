<template>
    <div>
        <main-header />

        <div class="container">

            <div class="user-header">
                <v-avatar class="avatar" size="120">
                    <v-img v-bind:src="userDatas.avatar"  />
                </v-avatar>

                <p class="name">{{ userDatas.firstName }} {{ userDatas.lastName }}</p>

                <p class="role" v-if="userDatas.isAdmin == false">Utilisateur</p>
                <p class="role" v-else>Modérateur</p>

                <div v-if="isAdmin == true" class="cta-delete">
                    <v-btn color="#F44336" outlined @click="deleteProfile()">
                        Supprimer le compte
                    </v-btn>
                </div>
            </div>

            <div class="tabs">
                <v-tabs centered show-arrows color="#F44336">
                    <v-tab @click="toggleInfos()">Infos</v-tab>
                    <v-tab @click="togglePosts()">Posts</v-tab>
                    <v-tab @click="toggleComments()">Commentaires</v-tab>
                </v-tabs>
            </div>

            <div class="user-infos">
                <div class="user-infos-list" v-if="showInfos == true">
                    <user-infos :email="email" :username="username" :department="department" />
                </div>

                <div class="user-posts" v-if="showPosts == true">
                    <user-posts :posts="posts" />
                </div>

                <div class="user-comments" v-if="showComments == true">
                    <user-comments :comments="comments" />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { getToken } from '../../../helpers/decode';
    import Header from '../Header/Header';
    import UserInfos from '../UserInfos/UserInfos';
    import UserPosts from '../UserPosts/UserPosts';
    import UserComments from '../UserComments/UserComments';

    export default {
        name: 'UserProfile',
        data() {
            return {
                usernameParams: '',
                email: '',
                username: '',
                department: '',
                token: '',
                userId: '',
                isAdmin: '',
                userDatas: '',
                comments: [],
                posts: [],
                showInfos: true,
                showPosts: false,
                showComments: false,
                notificationSystem: {
                    options: {
                        success: {
                            position: "bottomCenter",
                        },
                        error: {
                            position: "bottomCenter"
                        },
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
            this.usernameParams = this.$route.params.username;

            this.getInfosUser();
        },
        methods: {
            getInfosUser: function() {
                let infosUserObj = {
                    url: `http://localhost:3000/api/v1/users/profile/${this.usernameParams}`,
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    }
                };

                this.axios(infosUserObj)
                    .then(response => {
                        this.userDatas = response.data;
                        this.email = this.userDatas.email;
                        this.username = this.userDatas.username;
                        this.department = this.userDatas.department;

                        this.getAllPostsOfUser();
                        this.getAllCommentsOfUser();
                    })
                    .catch(error  => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/login` })
                        }

                        console.log(error);
                    });
            },
            getAllPostsOfUser: function() {
                this.axios
                    .get(`http://localhost:3000/api/v1/posts/users/${this.userDatas.id}`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        }
                    })
                    .then(response => {
                        this.posts = response.data;
                    })
                    .catch(error  => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/` })
                        }

                        console.log(error);
                    });
            },
            getAllCommentsOfUser: function() {
                this.axios
                    .get(`http://localhost:3000/api/v1/comments/users/${this.userDatas.id}`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        }
                    })
                    .then(response => {
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
            toggleInfos: function() {
                this.showInfos = true,
                this.showPosts = false,
                this.showComments = false
            },
            togglePosts: function() {
                this.showInfos = false,
                this.showPosts = true,
                this.showComments = false
            },
            toggleComments: function() {
                this.showInfos = false,
                this.showPosts = false,
                this.showComments = true
            },
            deleteProfile: function() {
                let deleteProfileObj = {
                    url: `http://localhost:3000/api/v1/users/${this.userDatas.id}`,
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    }
                };

                this.axios(deleteProfileObj)
                    .then(() => {
                        if (this.isAdmin == true) {
                            this.$toast.success('Compte utilisateur supprimé avec succès !', 'OK', this.notificationSystem.options.success);
                            setTimeout(() => {
                                this.$router.push({ path: `/user/profile/${this.userId}` })
                            }, 100)
                        } else {
                            this.$cookie.delete('token');
                            this.$router.push({ path: '/login' });
                        }
                    })
                    .catch(error => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/login` })
                        }

                        console.log(error);
                    })
            }
        },
        components: {
            'main-header': Header,
            'user-infos': UserInfos,
            'user-posts': UserPosts,
            'user-comments': UserComments,
        }
    }

</script>

<style scoped src="./UserProfile.css">

</style>