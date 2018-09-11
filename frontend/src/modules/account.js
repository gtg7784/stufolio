import update from "react-addons-update";
import { URL } from "config";
//Actions
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

//Action Creators
export function loginRequest(username, password) {
    return dispatch => {
        dispatch(login());
        return fetch(URL + "/token-auth/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "username=" + username + "&password=" + password
        })
            .then(response => response.json())
            .then(json => {
                if (json.token !== undefined) {
                    dispatch(loginSuccess(json));
                } else {
                    dispatch(loginFailure(json));
                }
            });
    };
}
export function login() {
    return {
        type: AUTH_LOGIN
    };
}
export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}
export function loginSuccess(data) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        data
    };
}
export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

//Reducer
const initialState = {
    login: {
        status: "INIT"
    },
    status: {
        isLoggedIn: false,
        auth: ""
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return update(state, {
                login: {
                    status: { $set: "WAITING" }
                }
            });
        case AUTH_LOGOUT:
            return update(state, {
                login: {
                    status: { $set: "INIT" }
                },
                status: {
                    isLoggedIn: { $set: false },
                    token: { $set: "" }
                }
            });
        case AUTH_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    isLoggedIn: { $set: true },
                    token: { $set: action.data.token }
                }
            });
        case AUTH_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: { $set: "FAILURE" }
                }
            });
        default:
            return state;
    }
}

//Export Reducer
export default reducer;
