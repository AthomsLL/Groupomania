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
                <v-tabs v-if="userDatas.isAdmin == false" centered show-arrows color="#F44336">
                    <v-tab @click="toggleInfos()">Infos</v-tab>
                    <v-tab @click="togglePosts()">Posts</v-tab>
                    <v-tab @click="toggleComments()">Commentaires</v-tab>
                </v-tabs>

                <v-tabs v-else centered show-arrows color="#F44336">
                    <v-tab @click="toggleInfosAdmin()">Infos</v-tab>
                    <v-tab @click="toggleUsers()">Utilisateurs</v-tab>
                    <v-tab @click="toggleLastPosts()">Derniers posts</v-tab>
                </v-tabs>
            </div>

            <div v-if="userDatas.isAdmin == false" class="user-infos">
                <div class="user-infos-list" v-if="showInfos == true">
                    <user-infos :email="email" :username="username" :department="department" />

                    <div v-if="userId == userDatas.id" class="cta-edit">
                        <v-btn color="#F44336" outlined large @click="goToEditProfile()">
                            Modifier Profil
                        </v-btn>
                    </div>
                </div>

                <div class="user-posts" v-if="showPosts == true">
                    <user-posts />
                </div>

                <div class="user-comments" v-if="showComments == true">
                    <user-comments />
                </div>
            </div>

            <div v-else class="admin-infos">
                <div class="admin-infos-list" v-if="showInfosAdmin == true">
                    <user-infos :email="email" :username="username" :department="department" />

                    <div v-if="userId == userDatas.id" class="cta-edit">
                        <v-btn color="#F44336" outlined large @click="goToEditProfile()">
                            Modifier Profil
                        </v-btn>
                    </div>
                </div>

                <div class="users-list" v-if="showUsers == true">
                    
                </div>

                <div class="last-posts" v-if="showLastPosts == true">
                    
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
        name: 'Profile',
        data() {
            return {
                email: '',
                username: '',
                department: '',
                token: '',
                userId: '',
                userDatas: '',
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

            this.getInfosUser();
        },
        methods: {
            getInfosUser: function() {
                let infosUserObj = {
                    url: `http://localhost:3000/api/v1/users/${this.userId}`,
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
                    })
                    .catch(error => console.log(error));
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
                this.showInfos = true,
                this.showUsers = false,
                this.showLastPosts = false
            },
            toggleUsers: function() {
                this.showInfos = false,
                this.showUsers = true,
                this.showLastPosts = false
            },
            toggleLastPosts: function() {
                this.showInfos = false,
                this.showUsers = false,
                this.showLastPosts = true
            },
            goToEditProfile: function() {
                this.$router.push({ path: '/user/edit-profile' });
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
        margin-top: 70px;
    }

</style>