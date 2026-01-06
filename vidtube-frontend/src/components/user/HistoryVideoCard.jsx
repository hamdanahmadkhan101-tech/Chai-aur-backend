import { Link } from "react-router-dom";
import { Clock, Eye, X, Play } from "lucide-react";
import Button from "../ui/Button.jsx";

export default function HistoryVideoCard({ video, onRemove, progress }) {
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatViews = (views) => {
    if (!views) return "0";
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) {
      onRemove(video._id);
    }
  };

  const progressPercentage = progress?.percentage || 0;

  return (
    <div className="group relative flex gap-4 p-3 rounded-lg hover:bg-surface-light transition-colors">
      {/* Thumbnail with progress bar */}
      <Link
        to={`/video/${video._id}`}
        className="relative shrink-0 w-40 md:w-48 aspect-video bg-surface rounded-lg overflow-hidden"
      >
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-surface to-surface-light">
            <div className="text-textSecondary text-2xl">📹</div>
          </div>
        )}

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold px-1.5 py-0.5 rounded flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDuration(video.duration)}
          </div>
        )}

        {/* Progress bar */}
        {progressPercentage > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="h-10 w-10 text-white fill-white" />
        </div>
      </Link>

      {/* Video Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/video/${video._id}`}>
          <h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
        </Link>

        <Link
          to={`/channel/${video.owner?.username}`}
          className="text-sm text-textSecondary hover:text-white transition-colors mt-1 inline-block"
        >
          {video.owner?.fullName || video.owner?.username}
        </Link>

        <div className="flex items-center gap-2 mt-1 text-xs text-textSecondary">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {formatViews(video.views)} views
          </span>
          <span>•</span>
          <span>{formatDate(video.createdAt)}</span>
        </div>

        {progress && progressPercentage > 0 && progressPercentage < 95 && (
          <div className="mt-2 text-xs text-primary">
            Resume from {formatDuration(progress.currentTime)}
          </div>
        )}
      </div>

      {/* Remove button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
        title="Remove from history"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
