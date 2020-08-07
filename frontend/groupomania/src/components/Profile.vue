<template>
    <div>
        <main-header />

        <div class="container">
            <div class="user-header">

                <v-avatar class="avatar" size="120">
                    <v-img v-bind:src="userDatas.avatar"  />
                </v-avatar>

            </div>
        </div>

    </div>
</template>

<script>
    import { getToken } from '../../helpers/decode';
    import axios from 'axios'
    import Header from './Header';

    export default {
        name: 'Profile',
        data() {
            return {
                token: '',
                userId: '',
                userDatas: '',
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
                    })
            }
        },
        components: {
            'main-header': Header,
        }
    }

</script>

<style scoped lang="scss">

    .user-header {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .avatar {
        margin-top: 20px;
    }

</style>