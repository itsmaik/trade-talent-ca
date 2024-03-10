import authServices from "../../services/authServices.mjs";
import handleUserRedirect from "../../utils/handleUserRedirect.mjs";
import handleLoading from "../../utils/handleLoading.mjs";

export default function RegisterController() {
  const registerForm = document.querySelector('#register-form');
  

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    handleLoading(true);

    const nameInput = registerForm.querySelector('#name');
    const emailInput = registerForm.querySelector('#email');
    const passwordInput = registerForm.querySelector('#password');

    const userData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };

    try {
      await authServices.register(userData);

      await authServices.login({ 
        email: userData.email, 
        password: userData.password 
      });

      window.location.reload();
      console.log("Registration Successful")
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      handleLoading(false);
    }
  }); 
};