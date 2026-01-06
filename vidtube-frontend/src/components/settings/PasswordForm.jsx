import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";

export default function PasswordForm({ onSubmit, loading = false }) {
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const handleFormSubmit = async (data) => {
    const success = await onSubmit({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });

    if (success) {
      reset();
    }
  };

  const togglePassword = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Current Password */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Current Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary" />
          <Input
            type={showPasswords.old ? "text" : "password"}
            placeholder="Enter current password"
            className="pl-10 pr-10"
            {...register("oldPassword", {
              required: "Current password is required",
            })}
          />
          <button
            type="button"
            onClick={() => togglePassword("old")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-white transition-colors"
          >
            {showPasswords.old ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.oldPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.oldPassword.message}
          </p>
        )}
      </div>

      {/* New Password */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary" />
          <Input
            type={showPasswords.new ? "text" : "password"}
            placeholder="Enter new password"
            className="pl-10 pr-10"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message:
                  "Password must contain uppercase, lowercase, and number",
              },
            })}
          />
          <button
            type="button"
            onClick={() => togglePassword("new")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-white transition-colors"
          >
            {showPasswords.new ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.newPassword.message}
          </p>
        )}
        <p className="mt-1 text-xs text-textSecondary">
          Must be 8+ characters with uppercase, lowercase, and numbers
        </p>
      </div>

      {/* Confirm New Password */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary" />
          <Input
            type={showPasswords.confirm ? "text" : "password"}
            placeholder="Confirm new password"
            className="pl-10 pr-10"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          <button
            type="button"
            onClick={() => togglePassword("confirm")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-white transition-colors"
          >
            {showPasswords.confirm ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-border">
        <Button type="submit" isLoading={loading} className="w-full sm:w-auto">
          Update Password
        </Button>
      </div>
    </form>
  );
}
