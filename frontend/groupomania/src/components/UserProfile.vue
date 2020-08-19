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
    import { getToken } from '../../helpers/decode';
    import axios from 'axios'
    import Header from './Header';
    import UserInfos from './UserInfos';
    import UserPosts from './UserPosts';
    import UserComments from './UserComments';

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
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            console.log(user);
            this.userId = user.id;
            this.isAdmin = user.isAdmin;
            this.usernameParams = this.$route.params.username;
            console.log(this.usernameParams);

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

                axios(infosUserObj)
                    .then(response => {
                        this.userDatas = response.data;
                        console.log(this.userDatas);
                        this.email = this.userDatas.email;
                        this.username = this.userDatas.username;
                        this.department = this.userDatas.department;

                        this.getAllPostsOfUser();
                        this.getAllCommentsOfUser();
                    })
                    .catch(error  => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/` })
                        }

                        console.log(error);
                    });
            },
            getAllPostsOfUser: function() {
                axios
                    .get(`http://localhost:3000/api/v1/posts/users/${this.userDatas.id}`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        }
                    })
                    .then(response => {
                        console.log(response.data);
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
                axios
                .get(`http://localhost:3000/api/v1/comments/users/${this.userDatas.id}`, {
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
                            this.$router.push({ path: `/` })
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

                axios(deleteProfileObj)
                    .then(response => {
                        if (this.isAdmin == true) {
                            this.$router.push({ path: `/user/profile/${this.userId}` })
                        } else {
                            this.$cookie.delete('token');
                            this.$router.push({ path: '/' });
                        }

                        console.log(response);
                    })
                    .catch(error => {
                        if (error.response.status == 401) {
                            this.$cookie.delete('token');
                            this.$router.push({ path: `/` })
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

<style scoped lang="scss">

    .user-header {
        border-bottom: 1px solid rgba(112,112,112, .5);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 30px;
    }

    .avatar {
        margin-top: 20px;
        margin-bottom: 5px;
    }

    .name {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 8px;
    }

    .role {
        background-color: #707070;
        border-radius: 5px;
        color: #fff;
        font-weight: 500;
        padding: 5px 8px;
    }

    .cta-edit {
        display: flex;
        justify-content: center !important;
        margin-top: 30px;
    }

</style>