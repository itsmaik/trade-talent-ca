export default function sortPosts(posts, filterType) {
  const sortedPosts = [...posts]; // Create a copy of the original array

  if (filterType === 'oldest') {
      sortedPosts.sort((a, b) => new Date(a.created) - new Date(b.created));
  } else if (filterType === 'newest') {
      sortedPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
  }

  return sortedPosts;
}