import PostsServices from "../../services/PostsServices.js";
import handleLoading from "../../utils/handleLoading.mjs";

export default function DeletePostController() {
  const deleteBtn = document.querySelectorAll('.dropdown-post-actions .delete-button');
  const confirmationModalBtn = document.querySelector('#confirm-delete-modal .confirm-delete-post')
  console.log(deleteBtn)
  if (deleteBtn.length === 0) return;

  deleteBtn.forEach(btn => {
    btn.addEventListener("click", (event) => {
      const postId = btn.dataset.postId;

      confirmationModalBtn.addEventListener('click', async () => {
        try {
          handleLoading(true);
          await PostsServices.delete(postId);
        } catch (error) {
          throw new Error(error);
        } finally {
          handleLoading(false);
          window.location.reload();
        }
      })
    })
  })
}