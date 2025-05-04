    const BASE_URL = 'http://localhost:8000';
    const LOGOUT_URL = `${BASE_URL}/api/logout`;
    const LOGIN_URL = `${BASE_URL}/api/login`;
    const REGISTER_URL = `${BASE_URL}/api/register`;
    const UPDATE_URL = (id) => `${BASE_URL}/api/users/update/${id}`;
    const DELETE_URL = (id) => `${BASE_URL}/api/users/delete/${id}`;

    export { BASE_URL, LOGOUT_URL, LOGIN_URL, REGISTER_URL, UPDATE_URL,DELETE_URL }