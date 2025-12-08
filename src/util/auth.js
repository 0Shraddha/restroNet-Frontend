export default function getAuthToken() {
    const token = localStorage.getItem('restaurantUser');
    console.log({token});
    return token || null;
}