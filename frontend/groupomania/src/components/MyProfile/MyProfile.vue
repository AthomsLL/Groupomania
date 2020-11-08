<template>
    <div>
        <main-header />

        <div class="container">

            <div class="user-header">
                <v-avatar class="avatar" size="120">
                    <v-img v-bind:src="userDatas.avatar"  />
                </v-avatar>

                <p class="name">{{ userDatas.firstName }} {{ userDatas.lastName }}</p>

                <p class="role" v-if="userDatas.isAdmin == true">Modérateur</p>
                <p class="role" v-else>Utilisateur</p>
            </div>

            <div class="tabs">
                <v-tabs v-if="userDatas.isAdmin == false" centered show-arrows color="#EA1C04" grow>
                    <v-tab @click="toggleInfos()">Infos Personnelles</v-tab>
                    <v-tab @click="togglePosts()">Posts</v-tab>
                    <v-tab @click="toggleComments()">Commentaires</v-tab>
                </v-tabs>

                <v-tabs v-else centered show-arrows color="#EA1C04" grow>
                    <v-tab @click="toggleInfosAdmin()">Infos Personnelles</v-tab>
                    <v-tab @click="toggleUsers()">Utilisateurs</v-tab>
                    <v-tab @click="toggleLastPosts()">Derniers posts</v-tab>
                </v-tabs>
            </div>

            <div v-if="userDatas.isAdmin == false" class="user-infos">
                <div class="user-infos-list" v-if="showInfos == true">
                    <user-infos :email="email" :username="username" :department="department" />

                    <div v-if="userId == userDatas.id" class="cta-edit">
                        <v-btn color="#EA1C04" outlined  @click="goToEditProfile()">
                            Modifier Profil
                        </v-btn>
                    </div>
                </div>

                <div class="user-posts" v-if="showPosts == true">
                    <user-posts :posts="posts" />
                </div>

                <div class="user-comments" v-if="showComments == true">
                    <user-comments :comments="comments" />
                </div>
            </div>

            <div v-else class="admin-infos">
                <div class="admin-infos-list" v-if="showInfosAdmin == true">
                    <user-infos :email="email" :username="username" :department="department" />

                    <div v-if="userId == userDatas.id" class="cta-edit">
                        <v-btn color="#EA1C04" outlined large @click="goToEditProfile()">
                            Modifier Profil
                        </v-btn>
                    </div>
                </div>

                <div class="users-list" v-if="showUsers == true">
                    <users-list />
                </div>

                <div class="last-posts" v-if="showLastPosts == true">
                    <last-posts />
                </div>
            </div>
        </div>

        <footer-menu :userId="userId" />

    </div>
</template>

<script>
    import { getToken } from '../../../helpers/decode';
    import Header from '../Header/Header';
    import UserInfos from '../UserInfos/UserInfos';
    import UserPosts from '../UserPosts/UserPosts';
    import UserComments from '../UserComments/UserComments';
    import UsersListForAdmin from '../UsersListForAdmin/UsersListForAdmin';
    import LastPostsForAdmin from '../LastPostsForAdmin/LastPostsForAdmin';
    import FooterMenu from '../FooterMenu/FooterMenu';

    export default {
        name: 'MyProfile',
        data() {
            return {
                email: '',
                username: '',
                department: '',
                token: '',
                userId: '',
                isAdmin: '',
                userDatas: '',
                posts: [],
                comments: [],
                showInfos: true,
                showPosts: false,
                showComments: false,
                showInfosAdmin: true,
                showUsers: false,
                showLastPosts: false
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;
            this.isAdmin = user.isAdmin;

            this.getInfosUserMe();
        },
        methods: {
            getInfosUserMe: function() {
                let infosUserObj = {
                    url: `http://localhost:3000/api/v1/users/${this.userId}`,
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
                    .get(`http://localhost:3000/api/v1/posts/users/${this.userId}`, {
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
                            this.$router.push({ path: `/login` })
                        }

                        console.log(error);
                    });
            },
            getAllCommentsOfUser: function() {
                this.axios
                    .get(`http://localhost:3000/api/v1/comments/users/${this.userId}`, {
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
            toggleInfosAdmin: function() {
                this.showInfosAdmin = true,
                this.showUsers = false,
                this.showLastPosts = false
            },
            toggleUsers: function() {
                this.showInfosAdmin = false,
                this.showUsers = true,
                this.showLastPosts = false
            },
            toggleLastPosts: function() {
                this.showInfosAdmin = false,
                this.showUsers = false,
                this.showLastPosts = true
            },
            goToEditProfile: function() {
                this.$router.push({ path: '/user/edit-profile' });
            },
        },
        components: {
            'main-header': Header,
            'user-infos': UserInfos,
            'user-posts': UserPosts,
            'user-comments': UserComments,
            'users-list': UsersListForAdmin,
            'last-posts': LastPostsForAdmin,
            'footer-menu': FooterMenu,
        }
    }

</script>

<style scoped src="./MyProfile.css">

</style>