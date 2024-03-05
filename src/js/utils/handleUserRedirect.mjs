import loginController from '../controllers/auth/loginController.mjs'
import logoutController from '../controllers/auth/logoutController.mjs';
import registerController from "../controllers/auth/registerController.mjs";
import createPostsController from '../controllers/posts/createPostsController.mjs';
import searchController from '../controllers/posts/searchController.mjs';
import postsServices from '../services/postsServices.mjs';
import handleLoading from "./handleLoading.mjs";
import normalizePath from "./normalizePath.mjs";

const handleUserRedirect = () => {
  document.addEventListener('DOMContentLoaded', async () => {
    const userLogged = localStorage.getItem('accessToken');

    const currentPath = window.location.pathname === "/" ?
      "/" : normalizePath(window.location.pathname);

    const allowedPaths = [
      '/', 
      '/index.html',
      '/pages/register', 
    ];

    // Control when user is logged so redirect auto to the right feed page when try to go to login !!being logged!!.
    if (userLogged && allowedPaths.includes(currentPath)) {
      window.location.href = '/pages/feed/'
    } 

    // Control when user not logged so redirect auto to the right login page
    if (!userLogged && !allowedPaths.includes(currentPath)) {
      window.location.href = '/'
    }

    // Control when and where to call the respective login or register function based on the url path
    // (this way will only load/take memory to run the right js functions and not unnecessary ones)
    if (!userLogged && (currentPath === allowedPaths[0] || currentPath === allowedPaths[1])) {
      loginController();
    } else if (!userLogged && currentPath === allowedPaths[2]) {
      registerController();
    }

    if (userLogged) {
      createPostsController();
      await postsServices.getAll()
      searchController()
      logoutController()
    }
  });
};

handleUserRedirect();

export default handleUserRedirect;