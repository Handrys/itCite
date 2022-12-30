import axios from "axios";
import {backendLink} from './projectData'

const instance = axios.create({
    baseURL: backendLink
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})

export default instance;