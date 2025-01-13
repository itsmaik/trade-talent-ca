import authServices from "../../services/authServices.mjs";
import handleLoading from "../../utils/handleLoading.mjs";
import handleUserRedirect from "../../utils/handleUserRedirect.mjs";

export default function LoginController() {
  const registerForm = document.querySelector('#login-form');

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    handleLoading(true);
    
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    const userData = {
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };

    try {
      await authServices.login({ ...userData });
      handleUserRedirect();
      console.log("Login Successful")
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed: Try a valid email and password');
    } finally {
      handleLoading(false);
      window.location.reload();
    }
  });
}