import getTimeAgo from "../utils/getTimeAgo.mjs";

export default function createPostTemplate({ title, created, body, media, author }) {
  return `
    <div class="card mb-3">
      <div class="card-header">
        <div class="d-flex align-items-center">
          <i class="bi bi-person-circle fs-2"></i>
  
          <div class="d-block">
            <p class="card-title ms-3 mb-0">Posted by ${author.name}</p>
            <p class="card-subtitle ms-3 text-muted mt-n1 fs-12-px">${getTimeAgo(created)}</p>
          </div>
        </div>
      </div>
      <div class="card-body">
        <h6 class="card-title mb-3">${title}</h6>
        ${body ? `<p class="card-text">${body}</p>` : ''}
        
        ${media ? `<img src="${media.url}" class="card-img-top mb-3" alt="...">` : ''}
        <!-- Comment Box -->
        <i class="bi bi-hand-thumbs-up me-2 icon-circle"></i>
        <i class="bi bi-chat-right me-2 icon-circle"></i>
        <i class="bi bi-send me-2 icon-circle"></i>
        <i class="bi bi-download me-2 icon-circle"></i>
        <div class="input-group mb-3 mt-4">
          <input
            type="text"
            class="form-control"
            placeholder="Leave a comment..."
            aria-label="Comment"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  `;
}