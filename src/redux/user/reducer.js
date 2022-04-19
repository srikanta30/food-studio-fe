import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from "./actionTypes";

const token = localStorage.getItem('token');
const userObj = JSON.parse(localStorage.getItem('userObj'));

const initState = {
    loading: false,
    token: token,
    failure: false,
    user: userObj
}

const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case LOGIN_LOADING: {
            return {
                ...state,
                loading: true,
                failure: false
            }
        }

        case LOGIN_FAILURE: {
            return {
                ...state,
                loading: false,
                failure: true,
            }
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                failure: false,
                token: payload.token,
                user: payload.user
            }
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
                loading: false,
                failure: false,
                token: payload.token,
                user: payload.user
            }
        }

        default: {
            return state;
        }
    }
}

export { reducer };