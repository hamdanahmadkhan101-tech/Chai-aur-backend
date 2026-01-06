import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import Button from "../components/ui/Button.jsx";
import { Play, Video, Users, TrendingUp } from "lucide-react";

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md supports-backdrop-filter:bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
                <Play className="h-5 w-5 fill-white text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                VidTube
              </h1>
            </Link>

            <nav className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <span className="hidden text-sm font-medium text-textSecondary sm:inline-block mr-1">
                    {user?.fullName || user?.username}
                  </span>
                  <Link to="/profile">
                    <Button variant="ghost" size="sm">
                      Profile
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface-light px-4 py-1.5 shadow-sm transition-all hover:shadow-md hover:border-zinc-500">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-textSecondary">
              Join thousands of creators
            </span>
          </div>

          <h2 className="mb-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Share your <span className="text-primary">videos</span> with the
            world
          </h2>

          <p className="mb-10 max-w-2xl text-lg text-textSecondary sm:text-xl">
            Upload, share, and discover amazing content. Connect with creators
            and build your audience on VidTube.
          </p>

          {!isAuthenticated && (
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/register">
                <Button size="lg" className="min-w-50">
                  Get started free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="min-w-50">
                  Sign in
                </Button>
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <div className="w-full max-w-xl rounded-2xl border border-border bg-surface-light p-8 shadow-xl transition-all hover:shadow-2xl hover:border-zinc-500">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-2xl font-semibold">
                Welcome back, {user?.fullName || user?.username}!
              </h3>
              <p className="text-textSecondary">
                Ready to create and share your next video?
              </p>
            </div>
          )}

          {/* Features */}
          <div className="mt-20 grid w-full gap-6 sm:grid-cols-3">
            <div className="group rounded-xl border border-border bg-surface-light p-6 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-white">
                Upload & Share
              </h3>
              <p className="text-sm text-textSecondary transition-colors group-hover:text-zinc-400">
                Easy video uploads with powerful sharing tools
              </p>
            </div>

            <div className="group rounded-xl border border-border bg-surface-light p-6 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-white">
                Build Community
              </h3>
              <p className="text-sm text-textSecondary transition-colors group-hover:text-zinc-400">
                Connect with viewers and grow your audience
              </p>
            </div>

            <div className="group rounded-xl border border-border bg-surface-light p-6 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-white">
                Discover Content
              </h3>
              <p className="text-sm text-textSecondary transition-colors group-hover:text-zinc-400">
                Explore trending videos and new creators
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
