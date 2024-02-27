import authServices from '../../services/authServices.mjs';
import redirect from '../../utils/redirect.mjs';

document.addEventListener ('DOMContentLoaded', () => {
  const registerForm = document.querySelector('#login-form');

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    const userData = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    try {
      const registrationResponse = await authServices.login({ ... userData});

      console.log('Login successful', registrationResponse);
      redirect()
    } catch (error) {
      // throw new Error(error);
      console.error('Error during login:', error);
      alert('Login failed: ' + error.message);
    }
  });
});