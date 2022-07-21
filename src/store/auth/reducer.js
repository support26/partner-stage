import { actionTypes } from './action';

const saveToken = (data) => {
    var token = data
    if (typeof window !== 'undefined' && localStorage && token) {
        localStorage.removeItem('userData')

        const now = new Date()
        const item = {
            token: token,
            expiry: now.getTime() + 3600000,
        }
        localStorage.setItem('userData', JSON.stringify(item))
    }
}

export const initState = {
    isLogin: false,
    auth: {},
    msg: null,
    GetAlladminUser: [],
    successMessage: null
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.LOGIN:
            saveToken(action.payload.data)
            return {
                ...state,
                ...{ auth: action.payload.data, isLogin: true },
            };
        case actionTypes.LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                ...{ auth: {}, isLogin: false },
            };
        case actionTypes.UPDATE_PROFILE:
            return {
                ...state,
                ...{ auth: action.profile },
            };
        case actionTypes.error_Message:
            return {
                ...state,
                ...{ msg: action.payload },
            };
        case actionTypes.AdminUser:
            return {
                ...state,
                ...{ GetAlladminUser: action.payload },
            };
        case actionTypes.success_msg:
            return {
                ...state,
                ...{ successMessage: action.payload },
            };

        default:
            return state;
    }
}

export default reducer;
