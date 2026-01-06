import { useState } from 'react';
import { MoreVertical, Edit3, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { deleteComment, updateComment } from '../../services/commentService.js';
import useAuth from '../../hooks/useAuth.js';

export default function CommentItem({
  comment,
  onUpdate,
  onDelete,
}) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const isOwner = user && comment.owner?._id === user._id;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  };

  const handleUpdate = async () => {
    if (!editContent.trim() || editContent === comment.content) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      await updateComment(comment._id, editContent);
      if (onUpdate) {
        onUpdate({ ...comment, content: editContent.trim() });
      }
      setIsEditing(false);
      toast.success('Comment updated');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to update comment'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteComment(comment._id);
      if (onDelete) {
        onDelete(comment._id);
      }
      toast.success('Comment deleted');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to delete comment'
      );
    } finally {
      setIsDeleting(false);
      setShowMenu(false);
    }
  };

  if (isDeleting) {
    return (
      <div className="py-3 text-center text-sm text-textSecondary">
        Deleting comment...
      </div>
    );
  }

  return (
    <div className="flex gap-3 py-3">
      {/* Avatar */}
      <div className="shrink-0">
        {comment.owner?.avatarUrl ? (
          <img
            src={comment.owner.avatarUrl}
            alt={comment.owner.fullName || comment.owner.username}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
            {(comment.owner?.fullName || comment.owner?.username || 'U')
              .charAt(0)
              .toUpperCase()}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="mb-1 flex items-start justify-between gap-2">
          <div>
            <span className="text-sm font-semibold text-white">
              {comment.owner?.fullName || comment.owner?.username || 'Unknown'}
            </span>
            <span className="ml-2 text-xs text-textSecondary">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          {isOwner && (
            <div className="relative shrink-0">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 hover:bg-surface rounded-full transition-colors"
              >
                <MoreVertical className="h-4 w-4 text-textSecondary" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-10">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface-light transition-colors text-white"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-red-500/10 text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
              maxLength={1000}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpdate}
                disabled={isUpdating || !editContent.trim()}
                className="px-4 py-1.5 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-[#cc0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(comment.content);
                }}
                disabled={isUpdating}
                className="px-4 py-1.5 text-sm font-semibold border border-border text-textSecondary rounded-lg hover:bg-surface-light transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-white whitespace-pre-wrap break-words">
            {comment.content}
          </p>
        )}
      </div>
    </div>
  );
}

