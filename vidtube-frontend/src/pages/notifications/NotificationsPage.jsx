import Header from '../../components/layout/Header.jsx';
import ProtectedRoute from '../../components/common/ProtectedRoute.jsx';
import { Bell } from 'lucide-react';

function NotificationsContent() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Bell className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-textSecondary max-w-md">
            Notifications feature is coming soon. You'll be able to see likes,
            comments, subscriptions, and more here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <NotificationsContent />
    </ProtectedRoute>
  );
}

