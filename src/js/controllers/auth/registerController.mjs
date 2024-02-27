import authServices from '../../services/authServices.mjs';
// import validateInputs from '../../utils/validateInputs.mjs';
import redirect from '../../utils/redirect.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('#register-form');


  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    const userData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    try {
      const registrationResponse = await authServices.register(userData);

      await authServices.login({
        email: userData.email,
        password: userData.password,
      });

      console.log('Registration successful', registrationResponse);

      redirect();
    } catch (error) {
      // throw new Error(error)
      console.error('Error during registration:', error);
      alert('Registration failed: ' + error.message);
    }
  });

  // const formInputs = registerForm.querySelectorAll('.input.form-control')

  // formInputs.forEach(input => {
  //   input.addEventListener('blur', () => {
  //     validateInputs(input);
  //   })
  // })
});