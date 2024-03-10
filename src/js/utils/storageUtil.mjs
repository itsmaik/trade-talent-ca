import AuthServices from '../services/authServices.mjs';

export const accessToken = AuthServices.getAccessToken();
export const loggedIn = AuthServices.isAuthenticated();
export const currentUser = AuthServices.getCurrentUser();