import { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../ui/Button.jsx';
import useAuth from '../../hooks/useAuth.js';

export default function CommentForm({ onSubmit, isSubmitting = false }) {
  const { isAuthenticated, user } = useAuth();
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    onSubmit(content.trim());
    setContent('');
  };

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border border-border bg-surface-light p-4 text-center">
        <p className="text-textSecondary text-sm">
          Please sign in to leave a comment
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="shrink-0">
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.fullName || user.username}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
            {(user?.fullName || user?.username || 'U').charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          rows={2}
          maxLength={1000}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-textSecondary">
            {content.length}/1000
          </span>
          <Button
            type="submit"
            size="sm"
            isLoading={isSubmitting}
            disabled={!content.trim() || isSubmitting}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Comment
          </Button>
        </div>
      </div>
    </form>
  );
}

