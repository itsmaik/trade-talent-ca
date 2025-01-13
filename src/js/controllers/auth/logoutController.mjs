import authServices from "../../services/authServices.mjs";

export default function LogoutController() {
  const logoutBtn = document.querySelector('button#logout');

  if (!logoutBtn) return;
  logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
  
    authServices.logout();
    window.location.href = "/"
  });
}