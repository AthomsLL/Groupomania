<template>
    <div class="header-home">
        <v-btn icon @click="goToPosts()" aria-label="close button">
            <v-icon size="24px">mdi-close</v-icon>
        </v-btn>

        <h1>Supprimer un post</h1>
    </div>

</template>

<script>
    export default {
        name: 'HeaderPosts',
        data() {
            return {
                
            }
        },
        methods: {
            goToPosts: function() {
                this.$router.push({ path: '/' });
            },
        }
    }
</script>

<style scoped src="./HeaderDeletePost.css">

</style>