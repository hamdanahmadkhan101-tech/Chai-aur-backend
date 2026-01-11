import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Loader2 } from "lucide-react";
import { subscriptionService } from "../services/subscriptionService.ts";

export const SubscriptionsPage: React.FC = () => {
  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: subscriptionService.getSubscriptions,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Subscriptions
        </h1>
        <p className="text-text-secondary text-lg">
          Channels you're subscribed to
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
        </div>
      ) : subscriptions && subscriptions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subscriptions.map((channel) => (
            <Link
              key={channel._id}
              to={`/channel/${channel.username}`}
              className="glass-card p-6 hover:bg-surface transition-all group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-primary-500/20 group-hover:ring-primary-500/50 transition-all">
                  <img
                    src={channel.avatar || "/default-avatar.jpg"}
                    alt={channel.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-primary-500 transition-colors">
                  {channel.fullName}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  @{channel.username}
                </p>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Users className="w-4 h-4" />
                  <span>
                    {channel.subscribersCount?.toLocaleString() || 0}{" "}
                    subscribers
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <Users className="w-16 h-16 text-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No subscriptions yet
          </h3>
          <p className="text-text-secondary mb-6">
            Start following channels to see their content here
          </p>
          <Link to="/trending" className="btn-primary">
            Discover Channels
          </Link>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsPage;
