import { RESTAURANTS_FAILURE, RESTAURANTS_SUCCESS, RESTAURANTS_LOADING, SEARCH_RESTAURANTS } from "./actionTypes";

const initState = {
    restaurants: [],
    loading: false,
    failure: false,
    usersRestaurant: [],
    pages: 1,
    cuisines: [],
}

const reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case RESTAURANTS_LOADING: {
            return {
                ...state,
                loading: true,
                failure: false
            }
        }

        case RESTAURANTS_FAILURE: {
            return {
                ...state,
                loading: false,
                failure: true
            }
        }

        case RESTAURANTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                failure: false,
                restaurants: [...payload.restaurants],
                pages: payload.pages,
                cuisines: payload.cuisines
            }
        }

        case SEARCH_RESTAURANTS: {
            return {
                ...state,
                loading: false,
                failure: false,
                restaurants: [...payload.restaurants],
                pages: payload.pages
            }
        }

        default: {
            return state;
        }
    }
}

export { reducer };