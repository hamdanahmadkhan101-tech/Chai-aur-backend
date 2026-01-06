import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Play } from "lucide-react";
import useAuth from "../../hooks/useAuth.js";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Play className="h-6 w-6 fill-white text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              VidTube
            </h1>
            <p className="mt-1 text-sm text-textSecondary">
              {isRegister ? "Create your account" : "Welcome back"}
            </p>
          </div>
        </div>

        {/* Auth Form */}
        <div className="rounded-2xl border border-border bg-surface-light p-8 shadow-2xl">
          <Outlet />
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-textSecondary">
          By continuing, you agree to VidTube's Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}
