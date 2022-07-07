export const actionTypes = {
    LOGIN: 'LOGIN',   
    LOGOUT: 'LOGOUT',   
    UPDATE_PROFILE:'UPDATE_PROFILE'
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