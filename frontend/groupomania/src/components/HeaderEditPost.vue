<template>
    <div>
        <div class="header-home">
            <v-btn icon @click="goToPosts()">
                <v-icon size="24px">mdi-close</v-icon>
            </v-btn>

            <h1>Modifier un post</h1>
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

<style scoped lang="scss">

    h1 {
        color: white;
        font-size: 27px;
        margin: 0 auto;
        text-transform: uppercase;
    }

    .header-home {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 5px;
    }

    .v-btn--round .v-btn__content .v-icon {
        color: white;
    }

</style>