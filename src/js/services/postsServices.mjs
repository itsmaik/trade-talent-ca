import { BASE_API_URL } from "../config/config.mjs";
import getApiKey from "../utils/getApiKey.mjs";
import createPostTemplate from "../templates/post.mjs"
import handleLoading from "../utils/handleLoading.mjs";

let originalPosts = [];

const postsServices = {
  async create({title, body, media}) {
    const accessToken = localStorage.getItem('accessToken')
    try {
    const apiKey = await getApiKey();
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey.data.key
        },
        body: JSON.stringify({
          title
        }),
      };

      const response = await fetch(`${BASE_API_URL}/social/posts`, options);
      console.log('response', response)
      await this.getAll();

    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getAll() {
    handleLoading(true);
    const accessToken = localStorage.getItem('accessToken');
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

      const response = await fetch(`${BASE_API_URL}/social/posts?_author=true`, options);
      const responseData = await response.json();
      console.log(responseData.data);

      originalPosts = responseData.data;

      const postsList = document.querySelector('#posts-list');
      postsList.innerHTML = '';

      responseData.data.forEach(post => {
        const postTemplate = createPostTemplate({ ...post });
        postsList.innerHTML += postTemplate;
      });

      handleLoading(false);
    } catch (error) {
      throw error; 
    } finally {
      handleLoading(false);
    }
  },

  searchPosts(searchTerm) {
    const postsList = document.querySelector('#posts-list');

    const filteredPosts = originalPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.body && post.body.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    postsList.innerHTML = '';

    filteredPosts.forEach(post => {
      const postTemplate = createPostTemplate({ ...post });
      postsList.innerHTML += postTemplate;
    });
  }
}

export default postsServices;