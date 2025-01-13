import LoginController from '../controllers/auth/LoginController.mjs'
import { accessToken } from "../utils/storageUtil.mjs";
import LogoutController from '../controllers/auth/LogoutController.mjs';
import RegisterController from "../controllers/auth/RegisterController.mjs";
import CreatePostController from '../controllers/posts/createPostsController.mjs';
import FilterController from '../controllers/posts/filterController.mjs';
import SearchController from '../controllers/posts/SearchController.mjs';
import SinglePostController from '../controllers/posts/singlePostController.mjs';
import ProfileController from '../profile/profileController.mjs';
import PostsServices from '../services/postsServices.mjs';
import ProfileServices from '../services/profileServices.mjs';
import normalizePath from "./normalizePath.mjs";
import EditPostController from '../controllers/posts/editPostController.mjs';
import createPostTemplate from '../templates/post.mjs';
import DeletePostController from '../controllers/posts/deletePostController.mjs';

const handleUserRedirect = () => {
  document.addEventListener('DOMContentLoaded', async () => {
    const userLogged = accessToken;

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
      LoginController();
    } else if (!userLogged && currentPath === allowedPaths[2]) {
      RegisterController();
    }

    if (userLogged) {
      CreatePostController();

      if (window.location.pathname.split('/').includes('feed')) {
        await PostsServices.getAll();
      }

      if (window.location.pathname.split('/').includes('profile')) {
        await ProfileServices.getAll();
      }

      ProfileController();
      SearchController();
      LogoutController();
      FilterController();
      SinglePostController();
      DeletePostController();
      EditPostController();
    }

    if (window.location.pathname.slice('/').includes('singlePost')) {
      const urlParams = new URLSearchParams(window.location.search);
      const postId = urlParams.get('id');
      const uniquePost = await PostsServices.getById(postId)

      const postsList = document.getElementById('posts-list');
      postsList.innerHTML = '';

      const postTemplate = createPostTemplate({ ...uniquePost });
      postsList.innerHTML = postTemplate;
    }
  });
};

handleUserRedirect();

export default handleUserRedirect; 