import { useState, useEffect } from 'react';
import { UserPlus, UserCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { toggleSubscription } from '../../services/subscriptionService.js';
import { getUserChannelProfile } from '../../services/userService.js';
import useAuth from '../../hooks/useAuth.js';
import Button from '../ui/Button.jsx';

export default function SubscribeButton({
  channelId,
  channelUsername,
  initialIsSubscribed = false,
  initialSubscribersCount = 0,
  onSubscriptionChange,
  size = 'md',
}) {
  const { isAuthenticated, user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(initialIsSubscribed);
  const [subscribersCount, setSubscribersCount] = useState(initialSubscribersCount);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch subscription status if channelUsername is provided
    const fetchSubscriptionStatus = async () => {
      if (!isAuthenticated || !channelUsername || !user) return;

      try {
        const response = await getUserChannelProfile(channelUsername);
        const channelData = response.data.data;
        setIsSubscribed(channelData.isSubscribed || false);
        setSubscribersCount(channelData.subscribersCount || 0);
      } catch (error) {
        // Silently fail - will use initial values
      }
    };

    fetchSubscriptionStatus();
  }, [channelUsername, isAuthenticated, user]);

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to subscribe');
      return;
    }

    if (isLoading) return;

    // Don't allow subscribing to own channel
    if (user && (user._id === channelId || user.username === channelUsername)) {
      toast.error("You can't subscribe to your own channel");
      return;
    }

    // Optimistic update
    const previousIsSubscribed = isSubscribed;
    const previousCount = subscribersCount;
    const newIsSubscribed = !isSubscribed;
    const newCount = newIsSubscribed
      ? subscribersCount + 1
      : Math.max(0, subscribersCount - 1);

    setIsSubscribed(newIsSubscribed);
    setSubscribersCount(newCount);

    if (onSubscriptionChange) {
      onSubscriptionChange(newIsSubscribed, newCount);
    }

    setIsLoading(true);

    try {
      await toggleSubscription(channelId);
      // Note: API doesn't return updated count, so we keep optimistic value
    } catch (error) {
      // Rollback on error
      setIsSubscribed(previousIsSubscribed);
      setSubscribersCount(previousCount);

      if (onSubscriptionChange) {
        onSubscriptionChange(previousIsSubscribed, previousCount);
      }

      toast.error(
        error.response?.data?.message || 'Failed to update subscription'
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

  const isOwnChannel =
    user && (user._id === channelId || user.username === channelUsername);

  if (isOwnChannel) {
    return null; // Don't show subscribe button on own channel
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={handleSubscribe}
        variant={isSubscribed ? 'outline' : 'primary'}
        size={size}
        isLoading={isLoading}
        disabled={isLoading || !isAuthenticated}
        className="flex items-center gap-2"
      >
        {isSubscribed ? (
          <>
            <UserCheck className="h-4 w-4" />
            Subscribed
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4" />
            Subscribe
          </>
        )}
      </Button>
      {subscribersCount > 0 && (
        <span className="text-sm font-semibold text-white">
          {formatCount(subscribersCount)} subscribers
        </span>
      )}
    </div>
  );
}

