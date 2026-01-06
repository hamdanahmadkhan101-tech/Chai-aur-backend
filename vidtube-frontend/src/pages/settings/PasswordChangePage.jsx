import { useState } from "react";
import { Settings, Lock, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import Header from "../../components/layout/Header.jsx";
import SettingsNavigation from "../../components/user/SettingsNavigation.jsx";
import PasswordForm from "../../components/settings/PasswordForm.jsx";
import { changePassword } from "../../services/userProfileService.js";

export default function PasswordChangePage() {
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (data) => {
    try {
      setLoading(true);
      await changePassword(data);
      toast.success("Password changed successfully");
      return true;
    } catch (err) {
      console.error("Failed to change password:", err);
      const message =
        err.response?.data?.message || "Failed to change password";
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
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
            {/* Password Section */}
            <section className="bg-surface rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-white">
                  Change Password
                </h2>
              </div>

              <p className="text-sm text-textSecondary mb-6">
                Update your password to keep your account secure. Choose a
                strong password that you don't use elsewhere.
              </p>

              <PasswordForm onSubmit={handlePasswordChange} loading={loading} />
            </section>

            {/* Security Tips */}
            <section className="bg-surface rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <h2 className="text-lg font-semibold text-white">
                  Security Tips
                </h2>
              </div>

              <ul className="space-y-3 text-sm text-textSecondary">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>
                    Use at least 8 characters with a mix of letters, numbers,
                    and symbols
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>
                    Don't use personal information like your name or birthday
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Don't reuse passwords from other websites</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>
                    Consider using a password manager to generate and store
                    secure passwords
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>
                    Change your password regularly, especially if you suspect
                    unauthorized access
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
