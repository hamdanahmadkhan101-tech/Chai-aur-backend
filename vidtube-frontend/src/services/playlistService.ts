import apiClient from './apiClient';
import type { ApiResponse, PaginatedResponse, Playlist, Video } from '../types';

export const playlistService = {
  // Create playlist
  createPlaylist: async (data: { name: string; description?: string; isPublic?: boolean }): Promise<Playlist> => {
    const response = await apiClient.post<ApiResponse<{ playlist: Playlist }>>('/playlists', data);
    return response.data.data!.playlist;
  },

  // Get user playlists
  getUserPlaylists: async (userId: string, params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Playlist>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Playlist>>>(`/playlists/user/${userId}`, { params });
    return response.data.data!;
  },

  // Get playlist by ID
  getPlaylistById: async (playlistId: string): Promise<Playlist> => {
    const response = await apiClient.get<ApiResponse<{ playlist: Playlist }>>(`/playlists/${playlistId}`);
    return response.data.data!.playlist;
  },

  // Update playlist
  updatePlaylist: async (playlistId: string, data: { name?: string; description?: string; isPublic?: boolean }): Promise<Playlist> => {
    const response = await apiClient.patch<ApiResponse<{ playlist: Playlist }>>(`/playlists/${playlistId}`, data);
    return response.data.data!.playlist;
  },

  // Delete playlist
  deletePlaylist: async (playlistId: string): Promise<void> => {
    await apiClient.delete(`/playlists/${playlistId}`);
  },

  // Add video to playlist
  addVideoToPlaylist: async (playlistId: string, videoId: string): Promise<Playlist> => {
    const response = await apiClient.patch<ApiResponse<{ playlist: Playlist }>>(`/playlists/${playlistId}/videos/${videoId}`);
    return response.data.data!.playlist;
  },

  // Remove video from playlist
  removeVideoFromPlaylist: async (playlistId: string, videoId: string): Promise<Playlist> => {
    const response = await apiClient.delete<ApiResponse<{ playlist: Playlist }>>(`/playlists/${playlistId}/videos/${videoId}`);
    return response.data.data!.playlist;
  },
};
