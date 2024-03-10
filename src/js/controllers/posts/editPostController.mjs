import PostsServices from "../../services/postsServices.mjs";
import handleLoading from "../../utils/handleLoading.mjs";
import DeletePostController from "../posts/deletePostController.mjs";

export default function EditPostController() {
  const editBtn = document.querySelectorAll('.dropdown-post-actions .edit-button');
  const confirmationModalBtn = document.querySelector('#edit-post-modal button.edit-post')
  console.log("editBtn", editBtn)
  let title = document.querySelector('#edit-post-form #postTitle');
  let body = document.querySelector('#edit-post-form #postComment');
  let media = document.querySelector('#edit-post-form #postFile');

  if (editBtn.length === 0) return;

  editBtn.forEach(async (btn) => {
    


    btn.addEventListener("click", async () => {
      const postId = btn.dataset.postId;

      const currentPost = await PostsServices.getById(postId)
      console.log("currentPost", currentPost)


      title.value = currentPost.title ?? ''
      body.value = currentPost.body ?? ''
      media.value = currentPost.media.url ? currentPost.media.url : ''

      confirmationModalBtn.addEventListener('click', async () => {
        if (title.value === '') {
          return alert("Post title can't be empty")
        }

        const postData = {
          title: title.value,
          body: body.value,
          media: {
            url: media.value ?? '',
            alt: ''
          }
        }
        try {
          handleLoading(true);
          await PostsServices.edit(postId, postData);
        } catch (error) {
          throw new Error(error);
        } finally {
          handleLoading(false);
          EditPostController();
          DeletePostController();
        }
      })
    })
  })
}