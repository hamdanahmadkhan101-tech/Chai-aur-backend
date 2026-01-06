import httpClient from './httpClient.js';

/**
 * Add a comment to a video
 * @param {string} videoId - Video ID
 * @param {string} content - Comment content
 * @returns {Promise}
 */
export const addComment = (videoId, content) =>
  httpClient.post(`/comments/${videoId}`, { content });

/**
 * Get comments for a video
 * @param {string} videoId - Video ID
 * @param {Object} params - Query parameters (page, limit)
 * @returns {Promise}
 */
export const getVideoComments = (videoId, params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);

  return httpClient.get(`/comments/${videoId}?${queryParams.toString()}`);
};

/**
 * Update a comment
 * @param {string} commentId - Comment ID
 * @param {string} content - Updated comment content
 * @returns {Promise}
 */
export const updateComment = (commentId, content) =>
  httpClient.patch(`/comments/c/${commentId}`, { content });

/**
 * Delete a comment
 * @param {string} commentId - Comment ID
 * @returns {Promise}
 */
export const deleteComment = (commentId) =>
  httpClient.delete(`/comments/c/${commentId}`);

