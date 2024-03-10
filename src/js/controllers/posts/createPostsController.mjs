import PostsServices from "../../services/postsServices.mjs";
import handleLoading from "../../utils/handleLoading.mjs";
import handleUserRedirect from "../../utils/handleUserRedirect.mjs";
import DeletePostController from "./deletePostController.mjs";
import EditPostController from "./editPostController.mjs";

export default function CreatePostController() {
  const registerForm = document.getElementById("new-post-form");
  const buttonSubmit = document.querySelector("button.add-new-post");
  const openModalBtn = document.querySelectorAll("button.new-post-modal");

  if (!registerForm) return;

  openModalBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      registerForm.querySelector("#postTitle").value = "";
      registerForm.querySelector("#postComment").value = "";
      registerForm.querySelector("#postFile").value = "";
    });
  });

  console.log("SSSSS");

  buttonSubmit.addEventListener("click", async (event) => {
    event.preventDefault();

    handleLoading(true);

    const title = registerForm.querySelector("#postTitle").value ?? "";
    const body = registerForm.querySelector("#postComment").value ?? "";
    const media = registerForm.querySelector("#postFile").value ?? "";

    const postData = {
      title,
      body,
      media: {
        url: media,
        alt: "",
      },
    };

    try {
      await PostsServices.create({ ...postData });

      handleUserRedirect();
    } catch (error) {
      // throw new Error(error);
      console.error("Post not successful:", error);
      alert("Post not successful: " + error.message);
    } finally {
      handleLoading(false);
      DeletePostController();
      EditPostController();
    }
  });
}
