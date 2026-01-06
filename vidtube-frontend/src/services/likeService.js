import httpClient from './httpClient.js';

/**
 * Toggle like status for a video
 * @param {string} videoId - Video ID
 * @returns {Promise}
 */
export const toggleVideoLike = (videoId) =>
  httpClient.post(`/likes/toggle/v/${videoId}`);

/**
 * Get user's liked videos
 * @param {Object} params - Query parameters (page, limit)
 * @returns {Promise}
 */
export const getLikedVideos = (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);

  return httpClient.get(`/likes/videos?${queryParams.toString()}`);
};

