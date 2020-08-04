<template>
    <div>
        <div class="header-contenu">
            <header-posts v-if="goToPosts()" />
            <header-edit-profile v-if="goToEditProfile()" />
            <header-profile v-if="goToProfile()" />
            <header-settings v-if="goToSettings()" />
            <header-edit-username v-if="goToEditUsername()" />
            <header-edit-password v-if="goToEditPassword()" />
            <header-delete-profile v-if="goToDeleteProfile()" />
            <header-one-post v-if="goToOnePost()" />
            <header-create-post v-if="goToCreatePost()" />
            <header-edit-post v-if="goToEditPost()"/>
            <header-delete-post v-if="goToDeletePost()" />
        </div>
    </div>
</template>

<script>
    import HeaderPosts from './HeaderPosts';
    import HeaderEditProfile from './HeaderEditProfile';
    import HeaderProfile from './HeaderProfile';
    import HeaderSettings from './HeaderSettings';
    import HeaderEditUsername from './HeaderEditUsername';
    import HeaderEditPassword from './HeaderEditPassword';
    import HeaderDeleteProfile from './HeaderDeleteProfile';
    import HeaderOnePost from './HeaderOnePost';
    import HeaderCreatePost from './HeaderCreatePost';
    import HeaderEditPost from './HeaderEditPost';
    import HeaderDeletePost from './HeaderDeletePost';

    export default {
        name: 'Header',
        data: () => ({

        }),
        methods: {
            goToOnePost: function() {
                if(this.$route.path == '/post/:postId') {
                    return true;
                }
            },
            goToPosts: function() {
                if(this.$route.path == '/posts') {
                    return true;
                }
            },
            goToEditProfile: function() {
                if(this.$route.path == '/user/edit-profile') {
                    return true;
                }   
            },
            goToProfile: function() {
                if(this.$route.path == '/user/profile') {
                    return true;
                } 
            },
            goToSettings: function() {
                if(this.$route.path == '/user/settings') {
                    return true;
                } 
            },
            goToEditUsername: function() {
                if(this.$route.path == '/user/edit-username') {
                    return true;
                } 
            },
            goToEditPassword: function() {
                if(this.$route.path == '/user/edit-password') {
                    return true;
                } 
            },
            goToDeleteProfile: function() {
                if(this.$route.path == '/user/delete-profile') {
                    return true;
                } 
            },
            goToCreatePost: function() {
                if(this.$route.path == '/post/create-post') {
                    return true;
                } 
            },
            goToEditPost: function() {
                if(this.$route.path == '/post/edit-post') {
                    return true;
                } 
            },
            goToDeletePost: function() {
                if(this.$route.path == '/post/delete-post') {
                    return true;
                } 
            }
        },
        components: {
            'header-posts': HeaderPosts,
            'header-edit-profile': HeaderEditProfile,
            'header-profile': HeaderProfile,
            'header-settings': HeaderSettings,
            'header-edit-username': HeaderEditUsername,
            'header-edit-password': HeaderEditPassword,
            'header-delete-profile': HeaderDeleteProfile,
            'header-one-post': HeaderOnePost,
            'header-create-post': HeaderCreatePost,
            'header-edit-post': HeaderEditPost,
            'header-delete-post': HeaderDeletePost,
        }
    }

</script>

<style scoped lang="scss">

    .header-contenu {
        height: 10vh;
        background-color: #f44336;
        box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.16);
    }

</style>
    