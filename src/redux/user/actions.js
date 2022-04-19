import { loginUserRequest } from "../../utils/networkRequests";
import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from "./actionTypes";

const loginLoading = () => {
    return {
        type: LOGIN_LOADING
    }
}

const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
}

const loginFailure = () => {
    return {
        type: LOGIN_FAILURE
    }
}

const logoutSuccess = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userObj');

    return {
        type: LOGOUT_SUCCESS,
        payload: {
            token: null,
            user: null
        }
    }
}

const loginUser = (payload) => async (dispatch) => {
    dispatch(loginLoading());

    try {
        const { data } = await loginUserRequest(payload);

        localStorage.setItem('token', data.data.token);
        localStorage.setItem('UserObj', JSON.stringify(data.data.user));

        dispatch(loginSuccess(data.data));
        window.location.href = "/";
    } catch (err) {
        dispatch(loginFailure());
    }
}


export { loginUser, logoutSuccess };