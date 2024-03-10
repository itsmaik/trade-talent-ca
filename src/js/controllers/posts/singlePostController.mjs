export default function SinglePostController() {
  const postsHeader = document.querySelectorAll('.bi-box-arrow-up-right') ?? 
  document.querySelectorAll('.bi-box-arrow-up-right');

  postsHeader.forEach(postHeader => {
    postHeader.addEventListener('click', (e) => {
      const postId = postHeader.dataset.postId;
      window.location.href = `/pages/singlePost/?id=${postId}`
    });
  })
}