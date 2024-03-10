export default function ProfilePostsController() {
  let profile = localStorage.getItem('currentUser');
  profile = JSON.parse(profile);
  console.log(profile)
  const username = document.getElementById('profile-username')

  if (!username) return;

  username.innerText = profile.name
}