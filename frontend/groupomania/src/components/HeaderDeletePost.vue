<template>
    <div class="header-home">
        <v-btn icon @click="goToPosts()">
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

<style scoped lang="scss">

    h1 {
        color: white;
        font-size: 25px;
        margin-left: -40px;
        text-transform: uppercase;
        flex: 3;
    }

    .header-home {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 5px;
    }

    .v-btn {
        flex: 1;
        justify-content: start;
        
    }

    .v-icon {
        color: white;
    }

    .v-btn--round .v-btn__content .v-icon {
        color: white;
    }

</style>