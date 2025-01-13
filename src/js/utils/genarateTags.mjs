
export default function generateTagCheckboxes(originalPosts, containerId) {
  const tagsContainer = document.querySelector(`.dropdown.filters .${containerId}`);

  if (!tagsContainer) {
    console.error(`Container with ID ${containerId} not found.`);
    return;
  }

  // Get all unique tags from posts
  const allTags = originalPosts.reduce((tags, post) => tags.concat(post.tags), []);
  const uniqueTags = [...new Set(allTags)];

  // Creates tags checkbox 
  const checkboxesHTML = uniqueTags.map(tag => `
      <input type="radio" name="${tag}" class="tag-checkbox" value="${tag}">
      ${tag}
  `);

  // Add checkboxes to html container
  tagsContainer.innerHTML = checkboxesHTML.join('');
}