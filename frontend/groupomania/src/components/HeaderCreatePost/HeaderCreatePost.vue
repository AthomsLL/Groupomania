<template>
    <div>
        <div class="header-home">
            <v-btn icon @click="goToPosts()" aria-label="close button">
                <v-icon size="24px">mdi-close</v-icon>
            </v-btn>

            <h1>Créer un post</h1>
        </div>
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

<style scoped src="./HeaderCreatePost.css">

</style>