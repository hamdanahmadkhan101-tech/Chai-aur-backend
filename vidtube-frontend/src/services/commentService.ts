import apiClient from "./apiClient";
import type { ApiResponse, PaginatedResponse, Comment } from "../types";

export const commentService = {
  // Get comments for a video
  getVideoComments: async (
    videoId: string,
    page = 1,
    limit = 20
  ): Promise<PaginatedResponse<Comment>> => {
    const response = await apiClient.get<ApiResponse<Comment[]>>(
      `/comments/${videoId}?page=${page}&limit=${limit}`
    );
    // Backend returns { data: [...], meta: { pagination: {...} } }
    return {
      docs: response.data.data || [],
      pagination: (response.data as any).meta?.pagination || {
        page: 1,
        limit: 20,
        totalDocs: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  },

  // Create comment
  createComment: async (
    videoId: string,
    content: string,
    parentId?: string
  ): Promise<Comment> => {
    const response = await apiClient.post<ApiResponse<{ comment: Comment }>>(
      `/comments/${videoId}`,
      { content, parent: parentId }
    );
    return response.data.data!.comment;
  },

  // Update comment
  updateComment: async (
    commentId: string,
    content: string
  ): Promise<Comment> => {
    const response = await apiClient.patch<ApiResponse<{ comment: Comment }>>(
      `/comments/${commentId}`,
      { content }
    );
    return response.data.data!.comment;
  },

  // Delete comment
  deleteComment: async (commentId: string): Promise<void> => {
    await apiClient.delete(`/comments/${commentId}`);
  },

  // Toggle comment like
  toggleLike: async (
    commentId: string
  ): Promise<{ isLiked: boolean; likesCount: number }> => {
    const response = await apiClient.post<
      ApiResponse<{ isLiked: boolean; likesCount: number }>
    >(`/likes/comment/${commentId}`);
    return response.data.data!;
  },

  // Get comment replies
  getReplies: async (
    parentId: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Comment>> => {
    const response = await apiClient.get<
      ApiResponse<PaginatedResponse<Comment>>
    >(`/comments/${parentId}/replies?page=${page}&limit=${limit}`);
    return response.data.data!;
  },
};
