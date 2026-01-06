import { useForm } from "react-hook-form";
import { User, Mail, AtSign } from "lucide-react";
import { useEffect } from "react";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";

export default function ProfileForm({ user, onSubmit, loading = false }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
    },
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  const handleFormSubmit = (data) => {
    // Only send changed fields
    const changes = {};
    if (data.fullName !== user?.fullName) changes.fullName = data.fullName;
    if (data.email !== user?.email) changes.email = data.email;

    if (Object.keys(changes).length > 0) {
      onSubmit(changes);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary" />
          <Input
            type="text"
            placeholder="Enter your full name"
            className="pl-10"
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Name cannot exceed 50 characters",
              },
            })}
          />
        </div>
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      {/* Username (read-only) */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Username
        </label>
        <div className="relative">
          <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary" />
          <Input
            type="text"
            className="pl-10 bg-surface-light cursor-not-allowed opacity-60"
            disabled
            {...register("username")}
          />
        </div>
        <p className="mt-1 text-xs text-textSecondary">
          Username cannot be changed
        </p>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary" />
          <Input
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="pt-4 border-t border-border flex items-center gap-4">
        <Button
          type="submit"
          isLoading={loading}
          disabled={!isDirty}
          className="w-full sm:w-auto"
        >
          Save Changes
        </Button>
        {isDirty && (
          <span className="text-sm text-textSecondary">
            You have unsaved changes
          </span>
        )}
      </div>
    </form>
  );
}
