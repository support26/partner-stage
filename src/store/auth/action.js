export const actionTypes = {
   LOGIN: 'LOGIN',
   LOGOUT: 'LOGOUT',
   UPDATE_PROFILE: 'UPDATE_PROFILE',
   error_Message: 'error_Message',
   Reset: 'Reset',
   success_msg: 'success_msg',
   AdminUser: 'AdminUser',
   Runner: 'Runner'
};

export function login(payload) {
   return { type: actionTypes.LOGIN, payload };
}

export function logout() {
   return { type: actionTypes.LOGOUT };
}

export function updateUserProfile(profile) {
   return { type: actionTypes.UPDATE_PROFILE, profile };
}


export function errorMessage(payload) {
   return { type: actionTypes.error_Message, payload };
}
// export function Reset(payload) {
//    return { type: actionTypes.Reset,payload};
// }
export function successMsg(payload) {
   return { type: actionTypes.success_msg, payload };
}
export function Runner(payload) {
   return { type: actionTypes.Runner, payload };
}
