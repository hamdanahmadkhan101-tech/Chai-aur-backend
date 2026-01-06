import { NavLink } from "react-router-dom";
import { User, Lock, Bell, Shield, Palette } from "lucide-react";
import clsx from "clsx";

const navigationItems = [
  {
    name: "Profile",
    href: "/settings",
    icon: User,
    description: "Update your profile information",
  },
  {
    name: "Password",
    href: "/settings/password",
    icon: Lock,
    description: "Change your password",
  },
  {
    name: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
    description: "Manage notification preferences",
    disabled: true,
  },
  {
    name: "Privacy",
    href: "/settings/privacy",
    icon: Shield,
    description: "Control your privacy settings",
    disabled: true,
  },
  {
    name: "Appearance",
    href: "/settings/appearance",
    icon: Palette,
    description: "Customize your experience",
    disabled: true,
  },
];

export default function SettingsNavigation() {
  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          end={item.href === "/settings"}
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              item.disabled && "opacity-50 pointer-events-none",
              isActive
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-textSecondary hover:bg-surface-light hover:text-white"
            )
          }
        >
          <item.icon className="w-5 h-5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-textSecondary truncate">
              {item.description}
            </p>
          </div>
          {item.disabled && (
            <span className="text-xs bg-surface-light px-2 py-0.5 rounded text-textSecondary">
              Soon
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
