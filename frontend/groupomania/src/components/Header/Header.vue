<template>
    <div>
        <div class="header-content">
            <header-posts v-if="goToPosts()" />
            <header-edit-profile v-if="goToEditProfile()" />
            <header-my-profile v-if="goToMyProfile()" />
            <header-user-profile v-if="goToUserProfile()" />
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
    import HeaderPosts from '../HeaderPosts/HeaderPosts';
    import HeaderEditProfile from '../HeaderEditProfile/HeaderEditProfile';
    import HeaderMyProfile from '../HeaderMyProfile/HeaderMyProfile';
    import HeaderUserProfile from '../HeaderUserProfile/HeaderUserProfile';
    import HeaderSettings from '../HeaderSettings/HeaderSettings';
    import HeaderEditUsername from '../HeaderEditUsername/HeaderEditUsername';
    import HeaderEditPassword from '../HeaderEditPassword/HeaderEditPassword';
    import HeaderDeleteProfile from '../HeaderDeleteProfile/HeaderDeleteProfile';
    import HeaderOnePost from '../HeaderOnePost/HeaderOnePost';
    import HeaderCreatePost from '../HeaderCreatePost/HeaderCreatePost';
    import HeaderEditPost from '../HeaderEditPost/HeaderEditPost';
    import HeaderDeletePost from '../HeaderDeletePost/HeaderDeletePost';

    export default {
        name: 'Header',
        data() {
            return {
                
            }
        },
        methods: {
            goToOnePost: function() {
                if(this.$route.path == `/post/${this.$route.params.postId}`) {
                    return true;
                }
            },
            goToPosts: function() {
                if(this.$route.path == '/') {
                    return true;
                }
            },
            goToEditProfile: function() {
                if(this.$route.path == '/user/edit-profile') {
                    return true;
                }   
            },
            goToMyProfile: function() {
                if(this.$route.path == `/user/profile/${this.$route.params.id}`) {
                    return true;
                } 
            },
            goToUserProfile: function() {
                if(this.$route.path == `/user/${this.$route.params.username}`) {
                    return true;
                }
            },
            goToSettings: function() {
                if(this.$route.path == '/settings') {
                    return true;
                } 
            },
            goToEditUsername: function() {
                if(this.$route.path == '/edit-username') {
                    return true;
                } 
            },
            goToEditPassword: function() {
                if(this.$route.path == '/edit-password') {
                    return true;
                } 
            },
            goToDeleteProfile: function() {
                if(this.$route.path == '/delete-profile') {
                    return true;
                } 
            },
            goToCreatePost: function() {
                if(this.$route.path == '/create-post') {
                    return true;
                } 
            },
            goToEditPost: function() {
                if(this.$route.path == `/edit-post/${this.$route.params.postId}`) {
                    return true;
                } 
            },
            goToDeletePost: function() {
                if(this.$route.path == '/delete-post') {
                    return true;
                } 
            }
        },
        components: {
            'header-posts': HeaderPosts,
            'header-edit-profile': HeaderEditProfile,
            'header-my-profile': HeaderMyProfile,
            'header-user-profile': HeaderUserProfile,
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

<style scoped src="./Header.css">

</style>
    