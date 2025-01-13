import postsServices from "../../services/postsServices.mjs";
import SinglePostController from "./SinglePostController.mjs";

export default function SearchController() {
  const searchInput = document.querySelector('.searchbar input');

  searchInput.addEventListener('input', async (e) => {
    const searchTerm = e.target.value.trim();
    
    postsServices.searchPosts(searchTerm);
    SinglePostController()
  });
}