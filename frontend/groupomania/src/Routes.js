import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import RecoverPassword from './components/RecoverPassword.vue';
import EditProfile from './components/EditProfile.vue';

export default [
    { path: '/', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword},
    { path: '/recover-password', name: 'recover-password', component: RecoverPassword},
    { path: '/user/edit-profile', name: 'edit-profile', component: EditProfile }
]