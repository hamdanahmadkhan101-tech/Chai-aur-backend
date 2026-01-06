import httpClient from './httpClient.js';

/**
 * Toggle subscription status for a channel
 * @param {string} channelId - Channel/User ID
 * @returns {Promise}
 */
export const toggleSubscription = (channelId) =>
  httpClient.post(`/users/toggle-subscription/${channelId}`);

