export default function Input({
  label,
  error,
  className = "",
  required,
  ...props
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-textSecondary">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <input
        className={`block w-full rounded-md border bg-surface px-3 py-2 text-sm text-white placeholder:text-zinc-500 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
          error ? "border-red-500" : "border-zinc-700"
        }`}
        required={required}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
