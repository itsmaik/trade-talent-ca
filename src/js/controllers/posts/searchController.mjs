import postsServices from "../../services/postsServices.mjs";

export default function SearchController() {
  const searchInput = document.querySelector('.searchbar input');

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    
    postsServices.searchPosts(searchTerm);
  });
}