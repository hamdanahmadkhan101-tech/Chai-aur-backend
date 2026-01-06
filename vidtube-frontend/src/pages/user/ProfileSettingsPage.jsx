import { useState } from "react";
import { Settings } from "lucide-react";
import toast from "react-hot-toast";
import Header from "../../components/layout/Header.jsx";
import SettingsNavigation from "../../components/user/SettingsNavigation.jsx";
import ProfileForm from "../../components/settings/ProfileForm.jsx";
import ProfileImageUpload from "../../components/user/ProfileImageUpload.jsx";
import useAuth from "../../hooks/useAuth.js";
import {
  updateProfile,
  updateAvatar,
  updateCoverImage,
} from "../../services/userProfileService.js";

export default function ProfileSettingsPage() {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);

  const handleProfileUpdate = async (data) => {
    try {
      setLoading(true);
      await updateProfile(data);
      await refreshUser?.();
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (file) => {
    try {
      setAvatarLoading(true);
      await updateAvatar(file);
      await refreshUser?.();
      toast.success("Avatar updated successfully");
    } catch (err) {
      console.error("Failed to update avatar:", err);
      toast.error(err.response?.data?.message || "Failed to update avatar");
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleCoverUpload = async (file) => {
    try {
      setCoverLoading(true);
      await updateCoverImage(file);
      await refreshUser?.();
      toast.success("Cover image updated successfully");
    } catch (err) {
      console.error("Failed to update cover:", err);
      toast.error(
        err.response?.data?.message || "Failed to update cover image"
      );
    } finally {
      setCoverLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <Header />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-lg bg-primary/10">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-sm text-textSecondary">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <SettingsNavigation />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Images Section */}
            <section className="bg-surface rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-white mb-6">
                Profile Images
              </h2>

              {/* Cover Image */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-textSecondary mb-3">
                  Cover Image
                </h3>
                <ProfileImageUpload
                  type="cover"
                  currentImage={user?.coverImageUrl}
                  onUpload={handleCoverUpload}
                  loading={coverLoading}
                />
              </div>

              {/* Avatar */}
              <div>
                <h3 className="text-sm font-medium text-textSecondary mb-3">
                  Profile Picture
                </h3>
                <ProfileImageUpload
                  type="avatar"
                  currentImage={user?.avatarUrl}
                  onUpload={handleAvatarUpload}
                  loading={avatarLoading}
                />
              </div>
            </section>

            {/* Profile Information Section */}
            <section className="bg-surface rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-white mb-6">
                Profile Information
              </h2>
              <ProfileForm
                user={user}
                onSubmit={handleProfileUpdate}
                loading={loading}
              />
            </section>

            {/* Danger Zone */}
            <section className="bg-surface rounded-xl p-6 border border-red-500/20">
              <h2 className="text-lg font-semibold text-red-400 mb-4">
                Danger Zone
              </h2>
              <p className="text-sm text-textSecondary mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button
                className="px-4 py-2 text-sm font-medium text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                onClick={() =>
                  toast.error("Account deletion is not available yet")
                }
              >
                Delete Account
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
