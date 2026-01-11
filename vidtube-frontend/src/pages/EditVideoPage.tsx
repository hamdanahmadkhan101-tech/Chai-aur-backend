import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Save, Loader2 } from "lucide-react";
import { videoService } from "../services/videoService";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import type { Video } from "../types";

export const EditVideoPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  // Fetch video data
  const { data: video, isLoading } = useQuery<Video>({
    queryKey: ["video", videoId],
    queryFn: () => videoService.getVideoById(videoId!),
    enabled: !!videoId,
  });

  // Initialize form with video data
  useEffect(() => {
    if (video) {
      // Check if user is the owner
      if (video.owner._id !== user?._id) {
        toast.error("You don't have permission to edit this video");
        navigate(`/watch/${videoId}`);
        return;
      }

      setTitle(video.title);
      setDescription(video.description || "");
      setThumbnailPreview(video.thumbnailUrl || "");
    }
  }, [video, user, videoId, navigate]);

  // Update video mutation
  const updateVideoMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await videoService.updateVideoWithFile(videoId!, formData);
    },
    onSuccess: () => {
      toast.success("Video updated successfully!");
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["video", videoId] });
      queryClient.invalidateQueries({ queryKey: ["myVideos"] });
      queryClient.invalidateQueries({ queryKey: ["userVideos"] });
      navigate(`/watch/${videoId}`);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update video";
      toast.error(errorMessage);
    },
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Thumbnail must be less than 5MB");
        return;
      }
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());

    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    updateVideoMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="skeleton h-12 mb-6" />
          <div className="skeleton h-64 mb-6" />
          <div className="skeleton h-32" />
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-text-secondary">Video not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(`/watch/${videoId}`)}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-text-primary" />
          </button>
          <h1 className="text-3xl font-bold text-text-primary">Edit Video</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thumbnail Upload */}
          <div className="glass-card p-6">
            <label className="block text-text-primary font-semibold mb-4">
              Thumbnail
            </label>
            <div className="flex flex-col gap-4">
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg"
                />
              )}
              <label className="btn-glass cursor-pointer w-fit">
                <Upload className="w-5 h-5 mr-2" />
                {thumbnailFile ? "Change Thumbnail" : "Upload New Thumbnail"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-text-secondary">
                Recommended: 1280x720 pixels (16:9 ratio), max 5MB
              </p>
            </div>
          </div>

          {/* Title */}
          <div className="glass-card p-6">
            <label className="block text-text-primary font-semibold mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              className="glass-input w-full"
              placeholder="Enter video title"
              required
            />
            <p className="text-sm text-text-secondary mt-2">
              {title.length}/200 characters
            </p>
          </div>

          {/* Description */}
          <div className="glass-card p-6">
            <label className="block text-text-primary font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={5000}
              rows={6}
              className="glass-input w-full resize-none"
              placeholder="Tell viewers about your video"
            />
            <p className="text-sm text-text-secondary mt-2">
              {description.length}/5000 characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={updateVideoMutation.isPending}
              className="btn-primary flex items-center gap-2"
            >
              {updateVideoMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/watch/${videoId}`)}
              className="btn-glass"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditVideoPage;
