<template>

    <div>
        <div class="container">
            <div class="avatar-container">
                <v-avatar color="blue" size="100" rounded="true">
                
                </v-avatar>
                <v-btn icon rounded="true">
                    <v-icon>mdi-cloud-upload</v-icon>
                </v-btn>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'EditProfile',
        data: () => ({
            userId: '',
        }),
        created() {
            this.userId = JSON.parse(this.$cookie.get('userId'));
        },
        methods: {

        }, 
        components: {

        }
    }

</script>

<style scoped lang="scss">
    .container {
        margin-top: 40px;
        padding: 0 30px;
        text-align: center;
    }

    .v-avatar {
        border: 3px solid rgba(0,0,0,.25);
        color: #fff;
    }
</style>

