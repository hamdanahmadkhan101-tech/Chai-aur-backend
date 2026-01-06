import httpClient from "./httpClient.js";

/**
 * Get current user's profile
 * @returns {Promise}
 */
export const getUserProfile = () => httpClient.get("/users/profile");

/**
 * Update user profile information
 * @param {Object} data - Profile data (fullName, email, etc.)
 * @returns {Promise}
 */
export const updateProfile = (data) =>
  httpClient.patch("/users/update-profile", data);

/**
 * Update user avatar
 * @param {File} file - Avatar image file
 * @returns {Promise}
 */
export const updateAvatar = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return httpClient.patch("/users/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/**
 * Update user cover image
 * @param {File} file - Cover image file
 * @returns {Promise}
 */
export const updateCoverImage = (file) => {
  const formData = new FormData();
  formData.append("coverImage", file);

  return httpClient.patch("/users/cover-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/**
 * Change user password
 * @param {Object} data - { oldPassword, newPassword }
 * @returns {Promise}
 */
export const changePassword = (data) =>
  httpClient.patch("/users/change-password", data);

/**
 * Get channel profile by username
 * @param {string} username - Channel username
 * @returns {Promise}
 */
export const getChannelProfile = (username) =>
  httpClient.get(`/users/c/${username}`);
