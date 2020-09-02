<template>
    <div>
        <div class="container">
            <div v-for="user in users" :key="user.id" justify="center">
                <v-list-item @click="goToUserProfile(user.username)">
                    <v-list-item-avatar size="48" class="avatar">
                        <v-img :src="user.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content class="content">
                        <v-list-item-title class="headline">{{ user.username }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
            </div>
        </div>
    </div>
</template>

<script>
    import { getToken } from '../../helpers/decode';
    import axios from 'axios'

    export default {
        name: 'UsersListAdmin',
        data() {
            return {
                token: '',
                userId: '',
                users: [],
            }
        },
        created() {
            const token = JSON.parse(this.$cookie.get('token'));
            this.token = token;
            const user = getToken();
            this.userId = user.id;

            this.getAllUsers();
        }, 
        methods: {
            getAllUsers: function() {
                axios
                .get('http://localhost:3000/api/v1/users', {
                    headers: {
                        Authorization: "Bearer " + this.token,
                    }
                })
                .then(response => {
                    console.log(response.data);
                    this.users = response.data;
                })
                .catch(error  => {
                    if (error.response.status == 401) {
                        this.$cookie.delete('token');
                        this.$router.push({ path: `/login` })
                    }

                    console.log(error);
                });
            },
            goToUserProfile: function(username) {
                this.$router.push({ path: `/user/${username}` });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .headline {
        font-size: 20px !important;
    }

</style>
