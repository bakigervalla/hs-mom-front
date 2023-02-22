import axios from 'axios'
let API_URL = ''; // 'http://localhost:8000/api';
export const setPath = (path) => {
    // ENDPOINT_URI = process.env.API_URL + path;
    API_URL = process.env.REACT_APP_API_URL + path;  //'http://localhost:8000/api' + path
}

export const client = axios.create({
    baseURL: API_URL
})

client.interceptors.request.use(
    function (config) {
        // attached endpoint to base url
        config.url = process.env.REACT_APP_API_URL + config.url
        // set auth header if token exist
        const token = localStorage.getItem('hs-auth-token')
        if (token)
            config.headers["Authorization"] = `Bearer ${token}`

        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

client.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        throw error  //Promise.reject(error)
    }
)
