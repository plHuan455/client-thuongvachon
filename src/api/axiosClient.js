import axios from 'axios';
import queryString from 'query-string';

// require('dotenv').config();
const productURL = 'https://thuongvachon.herokuapp.com/api';
// const devURL = 'http://localhost:8080/api';
const axiosClient = axios.create({
    baseURL: productURL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params)
});


// APi Resquest
axiosClient.interceptors.request.use(async config => {

    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        // console.log(config);
    }

    return config;
})

// API Response
axiosClient.interceptors.response.use(response => {
    if (response && response.data)
        return response.data;

    return response;
}, error => {
    //Handle Error
    throw error;
})

export default axiosClient;
