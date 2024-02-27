const BASE_API_URL = 'https://v2.api.noroff.dev'

const authServices = {
  login: async ({ email, password }) => {
    console.log(email, password)
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      };

      const response = await fetch(`${BASE_API_URL}/auth/login`, options);

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          const errorMessage = errorData.errors && errorData.errors.length
          > 0
            ? errorData.errors[0].message
            : 'Unknown validation error';
            
          throw errorMessage;
        } else if (response.status === 401) {
          const errorData = await response.json();
          const errorMessage = errorData.errors && errorData.errors.length > 0
            ? errorData.errors .message
            : 'Unknown validation error';

          throw errorMessage;
        } else {
          throw 'Failed to login. HTTP Status: ' + response.status;
        }
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.data.accessToken);

      return { success: true, message: 'Login successful' };
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      };

      const response = await fetch(`${BASE_API_URL}/auth/register`, options);

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          const errorMessage = errorData.errors && errorData.errors.length
          > 0
            ? errorData.errors[0].message
            : 'Unknown validation error';
          throw errorMessage;
        } else {
          throw 'Failed to register. HTTP status: ' + response.status;
        }
      }

      return { success: true, message: 'Registration successful'};
    } catch (error) {
      throw error;
    }
  },
};

export default authServices;