const redirect = () => {
  const userLogged = localStorage.getItem('accessToken');
  const currentPath = window.location.pathname
  const allowedPaths = ['/', '/pages/register/', '/index.html'];

  if (userLogged && allowedPaths.includes(currentPath)) {
    window.location.href = '/pages/feed'
  }

  if (!userLogged && allowedPaths.includes(currentPath)) {
    window.location.href = '/'
  }

};

export default redirect;