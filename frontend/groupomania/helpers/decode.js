import jwtDecode from 'jwt-decode';
import VueCookie from 'vue-cookie'

export function getToken() {
    const token = JSON.parse(VueCookie.get('token'));
    const decoded = jwtDecode(token);
    const user = decoded.user;

    return user;
}