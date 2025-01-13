import PostsServices from "../../services/postsServices.mjs";

export default function FilterController() {
  const oldestBtn = document.querySelectorAll('.dropdown.filters .oldest');
  const latestBtn = document.querySelectorAll('.dropdown.filters .latest');
  // const tagsContainer = document.querySelectorAll('.dropdown.filters .tags');

  oldestBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      PostsServices.filterPosts("oldest");
    })
  })

  latestBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      PostsServices.filterPosts("newest");
    })
  })
}