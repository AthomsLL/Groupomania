import swal from 'sweetalert2';
import VueCookie from 'vue-cookie';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import RecoverPassword from './components/RecoverPassword.vue';
import EditProfile from './components/EditProfile.vue';
import Profile from './components/Profile.vue';

// requiresAuth: true,
//         beforeEnter: (to, from, next) => {
//             if (this.$cookie.get('token') == null) {
//                 next ({ name: ''login' })
//                 swal('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
//             } else {
//                 next()
//             }
//         }

export default [
    {
        path: '/', 
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
        path: '/user/profile', 
        name: 'profile', 
        component: Profile 
    },
]