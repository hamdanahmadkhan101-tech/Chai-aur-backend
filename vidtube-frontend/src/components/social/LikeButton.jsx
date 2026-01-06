import { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { toggleVideoLike } from '../../services/likeService.js';
import useAuth from '../../hooks/useAuth.js';

export default function LikeButton({
  videoId,
  initialLikesCount = 0,
  initialIsLiked = false,
  onLikeChange,
  size = 'md',
  showCount = true,
}) {
  const { isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to like videos');
      return;
    }

    if (isLoading) return;

    // Optimistic update
    const previousIsLiked = isLiked;
    const previousLikesCount = likesCount;
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : Math.max(0, likesCount - 1);

    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);

    if (onLikeChange) {
      onLikeChange(newIsLiked, newLikesCount);
    }

    setIsLoading(true);

    try {
      const response = await toggleVideoLike(videoId);
      const { isLiked: serverIsLiked, likesCount: serverLikesCount } =
        response.data.data;

      // Update with server response
      setIsLiked(serverIsLiked);
      setLikesCount(serverLikesCount);

      if (onLikeChange) {
        onLikeChange(serverIsLiked, serverLikesCount);
      }
    } catch (error) {
      // Rollback on error
      setIsLiked(previousIsLiked);
      setLikesCount(previousLikesCount);

      if (onLikeChange) {
        onLikeChange(previousIsLiked, previousLikesCount);
      }

      toast.error(
        error.response?.data?.message || 'Failed to update like. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatCount = (count) => {
    if (!count) return '0';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading || !isAuthenticated}
      className={`flex items-center gap-2 rounded-lg border transition-all duration-200 ${
        isLiked
          ? 'border-primary bg-primary/10 text-primary hover:bg-primary/20'
          : 'border-border bg-surface text-textSecondary hover:bg-surface-light hover:text-white'
      } ${sizeClasses[size]} ${
        isLoading ? 'opacity-60 cursor-wait' : 'cursor-pointer'
      } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label={isLiked ? 'Unlike video' : 'Like video'}
    >
      <ThumbsUp
        className={`transition-transform duration-200 ${
          isLiked ? 'fill-current' : ''
        } ${isLoading ? 'animate-pulse' : ''}`}
        size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
      />
      {showCount && (
        <span className="font-semibold">{formatCount(likesCount)}</span>
      )}
    </button>
  );
}

