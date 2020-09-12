<template>
    <div>
        <v-btn class="cta-create" fab dark color="#F44332" @click="goToCreatePost()">
            <v-icon dark>mdi-pencil-plus</v-icon>
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: 'CreatePostButton',
        data() {
            return {

            }
        },
        methods: {
            goToCreatePost: function() {
                this.$router.push({ path: '/create-post' });
            }
        },
    }
</script>

<style scoped>

    .cta-create {
        position: fixed;
        bottom: 55px;
        right: 10px;
    }
    
</style>