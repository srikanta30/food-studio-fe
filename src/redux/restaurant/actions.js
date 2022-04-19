import { getRestaurantsRequest, searchRestaurantsRequest } from "../../utils/networkRequests";
import { RESTAURANTS_FAILURE, RESTAURANTS_SUCCESS, RESTAURANTS_LOADING, SEARCH_RESTAURANTS } from "./actionTypes";

const restaurantLoading = () => {
    return {
        type: RESTAURANTS_LOADING
    }
};

const restaurantSuccess = (payload) => {
    return {
        type: RESTAURANTS_SUCCESS,
        payload: payload
    }
};

const restaurantFailure = () => {
    return {
        type: RESTAURANTS_FAILURE,
    }
};

const searchRestaurantsSuccess = (payload) => {
    return {
        type: SEARCH_RESTAURANTS,
        payload: payload
    }
}

const getRestaurants = (query) => async (dispatch) => {
    try {
        dispatch(restaurantLoading());

        const data = await getRestaurantsRequest(query);

        const pages = [];

        for (let i = 1; i <= data.data.pages; i++) {
            pages.push(i);
        }

        dispatch(restaurantSuccess({ restaurants: data.data.restaurants, pages: pages, cuisines: [...data.data.cuisines] }));
    } catch (err) {
        dispatch(restaurantFailure());
    }
}



const searchRestaurants = (query) => async (dispatch) => {
    try {
        dispatch(restaurantLoading());

        const data = await searchRestaurantsRequest(query);

        dispatch(searchRestaurantsSuccess(data.data));
    } catch (err) {
        dispatch(restaurantFailure());
    }
}

export { getRestaurants, searchRestaurants };