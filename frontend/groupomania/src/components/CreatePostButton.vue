<template>
    <div>
        <v-btn class="cta-create" fab dark color="#F44332">
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

        },
    }
</script>

<style scoped lang="scss">
    .cta-create {
        position: fixed;
        bottom: 55px;
        right: 10px;
    }
</style>