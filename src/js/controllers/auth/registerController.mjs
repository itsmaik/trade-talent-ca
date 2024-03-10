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
      const registrationResponse = await authServices.register(userData);

      await authServices.login({ 
        email: userData.email, 
        password: userData.password 
      });

      handleUserRedirect();
      console.log("Registration Successful")
    } catch (error) {
      // throw new Error(error);
      console.error('Error during registration:', error);
      alert('Registration failed: ' + error.message);
    } finally {
      handleLoading(false);
    }
  }); 
};