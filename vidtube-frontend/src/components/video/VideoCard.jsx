import { Link } from "react-router-dom";
import { Clock, Eye, HeartOff } from "lucide-react";

export default function VideoCard({ video, showUnlike = false, onUnlike }) {
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

  const handleUnlike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onUnlike) {
      onUnlike(video._id);
    }
  };

  return (
    <Link
      to={`/video/${video._id}`}
      className="group relative flex flex-col cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-surface rounded-lg overflow-hidden mb-3">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-surface to-surface-light">
            <div className="text-textSecondary text-4xl">📹</div>
          </div>
        )}

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold px-1.5 py-0.5 rounded flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDuration(video.duration)}
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="shrink-0">
          {video.owner?.avatarUrl ? (
            <img
              src={video.owner.avatarUrl}
              alt={video.owner.fullName || video.owner.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
              {(video.owner?.fullName || video.owner?.username || "U")
                .charAt(0)
                .toUpperCase()}
            </div>
          )}
        </div>

        {/* Title and metadata */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <div className="flex flex-col gap-0.5 text-xs text-textSecondary">
            <span className="truncate">
              {video.owner?.fullName || video.owner?.username || "Unknown"}
            </span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatViews(video.views)}
              </span>
              {video.createdAt && <span>• {formatDate(video.createdAt)}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Unlike button */}
      {showUnlike && onUnlike && (
        <button
          onClick={handleUnlike}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 cursor-pointer"
          title="Remove from liked"
        >
          <HeartOff className="h-4 w-4" />
        </button>
      )}
    </Link>
  );
}
