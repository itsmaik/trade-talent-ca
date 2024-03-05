import postsServices from "../../services/postsServices.mjs";
import handleLoading from "../../utils/handleLoading.mjs";
import handleUserRedirect from "../../utils/handleUserRedirect.mjs";


export default function createPostsController() {
  const postForm = document.querySelector('#new-post-form');
  const postBtnSubmit = document.querySelector('button.add-new-post');
  if (!postForm) return;

  postBtnSubmit.addEventListener('click', async (event) => {
    event.preventDefault();

    handleLoading(true);

    const title = postForm.querySelector('#postTitle').value;
    const body = postForm.querySelector('#postFile').value;
    const media = postForm.querySelector('#postFile').value;

    const postData = {
      title,
      body,
      media,
    };

    try {
      await postsServices.create({ ...postForm });

      handleUserRedirect();
      console.log("Successful Posted")
    } catch (error) {
      console.error('Post not successful:', error);
      alert('Post not successful: ' + error.message);
    } finally {
      handleLoading(false);
    }
  });
}