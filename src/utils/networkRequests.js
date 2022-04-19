import axios from 'axios';

export const loginUserRequest = async (payload) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, payload);
}

export const getRestaurantsRequest = async(query) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/restaurant${query}`)
}

export const searchRestaurantsRequest = async(query) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/restaurant/search/search${query}`);
}