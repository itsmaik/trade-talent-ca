/**
 * Sorts an array of post objects based on their creation date.
 * @param {Object[]} posts - An array of post objects. Each post object must have a `created` property that can be parsed by the `Date` constructor.
 * @param {string} filterType - Specifies the sorting order. Accepts 'oldest' for ascending order or 'newest' for descending order.
 * @returns {Object[]} A new array containing the sorted posts according to the specified filter type.
 * @example
 * const posts = [
 *   { author: 'user1', body: 'Happy new year', created: '2021-01-01', id: '    1234', media: null, tags: [], title: 'New Year', edited: '' },
 *   { author: 'user2', body: 'Marry xmas', created: '2023-12-25', id:      '    3456', media: null, tags: [], title: 'Xmas eve', edited '' }
 * ];
 * const sortedByNewest = sortPosts(posts, 'newest');
 * console.log(sortedByNewest); // Logs posts sorted from newest to oldest
 */

export default function sortPosts(posts, filterType) {
  const sortedPosts = [...posts]; // Create a copy of the original array

  if (filterType === 'oldest') {
      sortedPosts.sort((a, b) => new Date(a.created) - new Date(b.created));
  } else if (filterType === 'newest') {
      sortedPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
  }

  return sortedPosts;
}