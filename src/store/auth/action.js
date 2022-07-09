export const actionTypes = {
    LOGIN: 'LOGIN',   
    LOGOUT: 'LOGOUT',   
    UPDATE_PROFILE:'UPDATE_PROFILE',
    error_Message:'error_Message',
    RESET_PASSWORD:'reset_password'
};

export function login(payload) {
   return { type: actionTypes.LOGIN, payload };
}

export function logout() {
   return { type: actionTypes.LOGOUT };
}

export function updateUserProfile(profile) {
   return { type: actionTypes.UPDATE_PROFILE ,profile};
}


export function errorMessage(payload) {
   return { type: actionTypes.error_Message,payload };
}
export function reset_password(payload) {
   return { type: actionTypes.RESET_PASSWORD,payload};
}
