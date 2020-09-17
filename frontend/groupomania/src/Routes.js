import swal from 'sweetalert2';
import VueCookie from 'vue-cookie';
import Login from './components/Login/Login.vue';
import Register from './components/Register/Register.vue';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.vue';
import RecoverPassword from './components/RecoverPassword/RecoverPassword.vue';
import EditProfile from './components/EditProfile/EditProfile.vue';
import MyProfile from './components/MyProfile/MyProfile.vue';
import UserProfile from './components/UserProfile/UserProfile.vue';
import UserSettings from './components/UserSettings/UserSettings.vue';
import EditUsername from './components/EditUsername/EditUsername.vue';
import EditPassword from './components/EditPassword/EditPassword.vue';
import DeleteProfile from './components/DeleteProfile/DeleteProfile.vue';
import Posts from './components/Posts/Posts.vue';
import OnePost from './components/OnePost/OnePost.vue';
import CreatePost from './components/CreatePost/CreatePost.vue';
import EditPost from './components/EditPost/EditPost.vue';

export default [
    {
        path: '/login', 
        name: 'login', 
        component: Login 
    },
    { 
        path: '/register', 
        name: 'register', 
        component: Register 
    },
    { 
        path: '/forgot-password', 
        name: 'forgot-password', 
        component: ForgotPassword
    },
    { 
        path: '/recover-password', 
        name: 'recover-password', 
        component: RecoverPassword
    },
    { 
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (VueCookie.get('token') == null) {
                next ({ name: 'login'})
            } else {
                next()
            }
        },
        path: '/', 
        name: 'posts', 
        component: Posts
    },
    { 
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (VueCookie.get('token') == null) {
                next ({ name: 'login'})
                swal.fire('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            }
        },
        path: '/user/edit-profile', 
        name: 'edit-profile', 
        component: EditProfile 
    },
    { 
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (VueCookie.get('token') == null) {
                next ({ name: 'login'})
                swal.fire('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            }
        },
        path: '/user/profile/:id', 
        name: 'my-profile', 
        component: MyProfile 
    },
    { 
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (VueCookie.get('token') == null) {
                next ({ name: 'login'})
                swal.fire('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            }
        },
        path: '/user/:username', 
        name: 'user-profile', 
        component: UserProfile 
    },
    { 
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (VueCookie.get('token') == null) {
                next ({ name: 'login'})
                swal.fire('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            }
        },
        path: '/settings', 
        name: 'settings', 
        component: UserSettings
    },
    { 
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (VueCookie.get('token') == null) {
                next ({ name: 'login'})
                swal.fire('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            }
        },
        path: '/edit-username', 
        name: 'edit-username', 
        component: EditUsername
    },
    { 
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (VueCookie.get('token') == null) {
                next ({ name: 'login'})
                swal.fire('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            }
        },
        path: '/edit-password', 
        name: 'edit-password', 
        component: EditPassword
    },
    { 
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (VueCookie.get('token') == null) {
                next ({ name: 'login'})
                swal.fire('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            }
        },
        path: '/delete-profile', 
        name: 'delete-profile', 
        component: DeleteProfile
    },
    { 
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (VueCookie.get('token') == null) {
                next ({ name: 'login'})
                swal.fire('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            }
        },
        path: '/post/:postId', 
        name: 'one-post', 
        component: OnePost
    },
    { 
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (VueCookie.get('token') == null) {
                next ({ name: 'login'})
                swal.fire('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            }
        },
        path: '/create-post', 
        name: 'create-post', 
        component: CreatePost
    },
    { 
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (VueCookie.get('token') == null) {
                next ({ name: 'login'})
                swal.fire('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            }
        },
        path: '/edit-post/:postId', 
        name: 'edit-post', 
        component: EditPost
    }
]