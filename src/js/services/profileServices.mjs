import { BASE_API_URL } from "../config/config.mjs";
import { accessToken, currentUser} from "../utils/storageUtil.mjs";
import SinglePostController from "../controllers/posts/singlePostController.mjs";
import createUserPostTemplate from "../templates/userPosts.mjs";
import getApiKey from "../utils/getApiKey.mjs";
import handleLoading from "../utils/handleLoading.mjs";
import DeletePostController from "../controllers/posts/deletePostController.mjs";
import EditPostController from "../controllers/posts/editPostController.mjs";

let originalPosts = [];

const ProfileServices = {
  async getAll() {
    handleLoading(true);
    try {
      const apiKey = await getApiKey();
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey.data.key
        },
      };

      const response = await fetch(`${BASE_API_URL}/social/profiles/${currentUser.name}/posts?_author=true`, options);
      const responseData = await response.json();

      originalPosts = responseData.data;

      const postsList = document.getElementById('user-posts-list');
      postsList.innerHTML = '';

      originalPosts.forEach(post => {
        const postTemplate = createUserPostTemplate({ ...post });
        postsList.innerHTML += postTemplate;
      });

      // generateTagCheckboxes(originalPosts, 'tags-1');
      // generateTagCheckboxes(originalPosts, 'tags-2');
      SinglePostController()
      handleLoading(false);
    } catch (error) {
      throw error;
    } finally {
      handleLoading(false);
      DeletePostController()
      EditPostController()
    }
  },
}

export default ProfileServices;