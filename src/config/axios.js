import axios from "axios";

const AUTH_URL = process.env.REACT_APP_API_URL; //`http://localhost:5432`;

export const config = {

    AUTH_URL,

    httpHeaders: { headers: { 'Content-Type': 'application/json' } },

    // non-global axios setup
    authAxios: axios.create({
        baseURL: AUTH_URL,
        headers: { "x-auth-token": localStorage.getItem('auth_token') || '' }
    }),

    // global axios setup
    // setAuthHeaderToken: axios.interceptors.request.use(config => {
    //     config.headers.authorization = `Bearer ${localStorage.getItem('sre')}`;
    //     return config;
    // }, error => Promise.reject(error)),

    // setAuthHeaderToken: token => {
    //     if(token) {
    //         axios.defaults.headers.common['x-auth-token'] = token;
    //     } else {
    //         delete axios.defaults.headers.common['x-auth-token'];
    //     }
    // }

};