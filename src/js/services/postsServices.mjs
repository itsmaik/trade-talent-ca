import { BASE_API_URL } from "../config/config.mjs";
import { accessToken, currentUser} from "../utils/storageUtil.mjs";
import getApiKey from "../utils/getApiKey.mjs";
import createPostTemplate from "../templates/post.mjs"
import handleLoading from "../utils/handleLoading.mjs";
import sortPosts from "../utils/sortPosts.mjs";
import ProfileServices from "./profileServices.mjs";
import createUserPostTemplate from "../templates/userPosts.mjs";
// import generateTagCheckboxes from "../utils/generateTags.js";

let originalPosts = [];

const PostsServices = {
  async create({ title, body, media }) {
    try {
    const apiKey = await getApiKey();
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey.data.key
        },
        body: media.url ? JSON.stringify({
          title,
          body,
          media
        }) :
        JSON.stringify({
          title,
          body,
        }),
      };


      const response = await fetch(`${BASE_API_URL}/social/posts`, options);

      console.log("response", response)
      
      if (window.location.pathname.split('/').includes('feed')) {
        await PostsServices.getAll()
      }

      if (window.location.pathname.split('/').includes('profile')) {
        await ProfileServices.getAll();
      }

    } catch (error) {
      console.error(error);
      throw error;
    } 
  },

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

      const response = await fetch(`${BASE_API_URL}/social/posts?_author=true`, options);
      const responseData = await response.json();
      console.log(responseData.data);

      originalPosts = responseData.data;

      const postsList = document.getElementById('posts-list');
      postsList.innerHTML = '';

      originalPosts.forEach(post => {
        const postTemplate = createPostTemplate({ ...post });
        postsList.innerHTML += postTemplate;
      });
    } catch (error) {
      throw error;
    } finally {
      handleLoading(false);
    }
  },

  async getById(id) {
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

      const response = await fetch(`${BASE_API_URL}/social/posts/${id}?_author=true`, options);
      const responseData = await response.json();
      console.log(responseData.data);

      return responseData.data;

    } catch (error) {
      throw error;
    } finally {
      handleLoading(false);
    }
  },

  async delete(id) {
    console.log("id", id)
    const apiKey = await getApiKey();
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey.data.key
      },
    };

    await fetch(`${BASE_API_URL}/social/posts/${id}`, options);
  },

  async edit(id, post) {
    try {
      const apiKey = await getApiKey();
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey.data.key
        },
        body: post.media.url ? JSON.stringify({
          title: post.title,
          body: post.body,
          media: post.media
        }) :
        JSON.stringify({
          title: post.title,
          body: post.body,
        }),
      };

      const response = await fetch(`${BASE_API_URL}/social/posts/${id}`, options);

      console.log("response", response)
      
      if (window.location.pathname.split('/').includes('feed')) {
        await PostsServices.getAll()
      }

      if (window.location.pathname.split('/').includes('profile')) {
        await ProfileServices.getAll();
      }

    } catch (error) {
      console.error(error);
      throw error;
    } 
  },

  async searchPosts(searchTerm) {
    const postsList = document.getElementById('posts-list');
    
    if (searchTerm.length <= 2) {
      await this.getAll();
      return;
    }

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
      // Construct the URL with the search query
      const searchQuery = `/social/posts/search?_author=true&q=${encodeURIComponent(searchTerm)}`;
  
      // Perform the GET request using Fetch
      const response = await fetch(`${BASE_API_URL}${searchQuery}`, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data)
      // Clear the posts list
      postsList.innerHTML = '';
  
      // Display the search results
      data.data.forEach(post => {
        const postTemplate = createPostTemplate({ ...post });
        postsList.innerHTML += postTemplate;
      });
    } catch (error) {
      // Handle errors
      console.error('Error during fetch:', error.message);
    }
  },

  async filterPosts(filterType) {
    let postsList;

    try {
      handleLoading(true);
      const apiKey = await getApiKey();
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey.data.key
        },
      };

      let response;

      if (window.location.pathname.split('/').includes('feed')) {
        response = await fetch(`${BASE_API_URL}/social/posts?_author=true`, options);
        postsList = document.getElementById('posts-list');
      }

      if (window.location.pathname.split('/').includes('profile')) {
        response = await fetch(`${BASE_API_URL}/social/profiles/${currentUser.name}/posts?_author=true`, options);
        postsList = document.getElementById('user-posts-list');
      }


      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Sort the posts based on filter type
      const sortedPosts = sortPosts(data.data, filterType);

      // Clear the posts list
      postsList.innerHTML = '';
      let postTemplate;

      // Display the sorted results
      sortedPosts.forEach(post => {
        if (window.location.pathname.split('/').includes('feed')) {
          postTemplate = createPostTemplate({ ...post });

        }
  
        if (window.location.pathname.split('/').includes('profile')) {
          postTemplate = createUserPostTemplate({ ...post });
        }
        postsList.innerHTML += postTemplate;
      });
    } catch (error) {
      // Handle errors
      console.error('Error during fetch:', error.message);
    } finally {
      handleLoading(false);
    }
  },

  async filterPostsByTags(selectedTag) {
    const postsList = document.getElementById('posts-list');
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

      const response = await fetch(`${BASE_API_URL}/social/posts?_author=true&_tag=${selectedTag}`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      const filteredPosts = data.data

      // Clear the posts list
      postsList.innerHTML = '';

      // Display the filtered results
      filteredPosts.forEach(post => {
        const postTemplate = createPostTemplate({ ...post });
        postsList.innerHTML += postTemplate;
      });
    } catch (error) {
      // Handle errors
      console.error('Error during fetch:', error.message);
    }
  },
}

export default PostsServices;