import authServices from "../../services/authServices.mjs";
import handleUserRedirect from "../../utils/handleUserRedirect.mjs";

export default function LogoutController() {
  const logoutBtn = document.querySelector('button#logout');

  if (!logoutBtn) return;
  console.log(logoutBtn)
  logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
  
    authServices.logout();
    window.location.href = "/"
  });
}