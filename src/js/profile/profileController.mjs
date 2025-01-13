import { currentUser } from "../utils/storageUtil.mjs";

export default function ProfileController() {
  const profile = currentUser
  const username = document.getElementById('profile-username');

  if (!username) return;

  username.innerText = profile.name
}