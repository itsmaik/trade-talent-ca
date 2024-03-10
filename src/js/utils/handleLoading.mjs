export default function handleLoading(isLoading) {
  const loaderModalHtml = isLoading ? `
    <div style="z-index: 99999;" class="modal fade" id="loaderModal" tabindex="2" aria-labelledby="loaderModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered mw-100 h-100 m-0">
        <div class="modal-content h-100 bg-opacity-25 bg-dark">
          <div class="modal-body text-center d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ` : '';

  document.body.insertAdjacentHTML('afterbegin', loaderModalHtml);

  const loaderElement = document.getElementById('loaderModal');
  if (!loaderElement) return;

  if (isLoading) {
    showLoader(loaderElement);
  } else {
    hideLoader(loaderElement);
  }
}

function showLoader(loaderElement) {
  loaderElement.classList.add('d-block', 'show');
}

function hideLoader(loaderElement) {
  loaderElement.remove();
}
