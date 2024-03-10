import { BASE_API_URL } from "../config/config.mjs";

const AuthServices = {
  login: async ({ email, password }) => {
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
          const errorMessage = errorData.errors && errorData.errors.length > 0
            ? errorData.errors[0].message
            : 'Unknown validation error';

          throw errorMessage;
        } else if (response.status === 401) {
          const errorData = await response.json();
          const errorMessage = errorData.errors && errorData.errors.length > 0
            ? errorData.errors[0].message
            : 'Unknown validation error';

          throw errorMessage;
        } else {
          throw 'Failed to login. HTTP Status: ' + response.status;
        }
      }

      const user = await response.json();
      localStorage.setItem("accessToken", user.data.accessToken);
      localStorage.setItem("currentUser", JSON.stringify(user.data));
      
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
          const errorMessage = errorData.errors && errorData.errors.length > 0
            ? errorData.errors[0].message
            : 'Unknown validation error';

          throw 'Registration failed: ' + errorMessage;
        } else if (response.status === 401) {
          const errorData = await response.json();
          const errorMessage = errorData.errors && errorData.errors.length > 0
            ? errorData.errors[0].message
            : 'Unknown validation error';

          throw errorMessage;
        } else {
          throw 'Failed to register. HTTP Status: ' + response.status;
        }
      }
      
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      throw error;
    }
  },

  // get the current access token from localStorage
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },

  getCurrentUser: () => {
    const currentUserJSON = localStorage.getItem("currentUser");
    if (currentUserJSON) {
      return JSON.parse(currentUserJSON);
    }
    return null; // Return null if no current user data is found
  },


  // check if the user is currently authenticated
  isAuthenticated: () => {
    const token = AuthServices.getAccessToken();
    return !!token; // Converts a token into a boolean value
  },

  logout: () => {
    localStorage.clear();
  }
};

export default AuthServices;
