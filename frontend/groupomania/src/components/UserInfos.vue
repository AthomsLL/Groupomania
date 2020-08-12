<template>
    <div class="mt-3">
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="infos-title">Email</v-list-item-title>
                <v-list-item-subtitle class="infos-subtitle">{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="infos-title">Pseudo</v-list-item-title>
                <v-list-item-subtitle class="infos-subtitle">{{ username }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="infos-title">Département</v-list-item-title>
                <v-list-item-subtitle class="infos-subtitle">{{ department }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>

<script>
    export default {
        name: 'UserInfos',
        props: ['email', 'username', 'department'],
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">

    .infos-title {
        font-size: 20px;
        margin-bottom: 10px;
    }

    .infos-subtitle {
        font-size: 18px;
    }
</style>