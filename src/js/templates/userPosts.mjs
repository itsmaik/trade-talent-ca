import getTimeAgo from "../utils/getTimeAgo.mjs";
import { currentUser } from "../utils/storageUtil.mjs";

export default function createUserPostTemplate({ title, created, body, media, id }) {
  return `
    <div class="card mb-3 col-lg-5 px-0" style="height: fit-content;">
    <div class="card-header">
      <div class="d-flex align-items-center">
        <i class="bi bi-person-circle fs-2"></i>
        
        <div class="d-block">
          <p class="card-title ms-3 mb-0">Posted by ${currentUser.name}</p>
          <p style="font-size: 12px;" class="card-subtitle ms-3 text-muted mt-n1">${getTimeAgo(created)}</p>
        </div>
      </div>
      <div class="dropdown dropdown-post-actions">
        <i class="btn bi bi-box-arrow-up-right" data-post-id="${id}"></i>
          <button class="btn custom-dropdown" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-list-ul"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><button type="button" class="dropdown-item edit-button" data-post-id="${id}" data-bs-toggle="modal" data-bs-target="#edit-post-modal">Edit</button></li>
            <li><button class="btn dropdown-item  delete-button" type="button" data-post-id="${id}" data-bs-toggle="modal" data-bs-target="#confirm-delete-modal">Delete</button>
            </li>
          </ul>
      </div>
    </div>
    <div class="card-body">
      <h6 class="card-title mb-3">${title}</h6>
      ${body ? `<p class="card-text">${body}</p>` : ''}
      
      ${media ? `<img src="${media.url}" class="card-img-top mb-3" alt="..." style="height: auto; max-height: 450px; object-fit: cover;">` : ''}
      <!-- Comment Box -->
      <i class="bi bi-hand-thumbs-up me-2 icon-circle"></i>
      <i class="bi bi-chat-right me-2 icon-circle"></i>
      <i class="bi bi-send me-2 icon-circle"></i>
      <i class="bi bi-download me-2 icon-circle"></i>
      <div class="input-group mb-3 mt-4">
          <input type="text" class="form-control" placeholder="Leave a comment..." aria-label="Comment">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2">Post</button>
      </div>
    </div>
  </div>
  `
}