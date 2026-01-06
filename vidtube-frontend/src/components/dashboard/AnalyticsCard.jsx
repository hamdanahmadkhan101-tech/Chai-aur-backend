import { TrendingUp, TrendingDown } from 'lucide-react';

export default function AnalyticsCard({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  formatValue = (v) => v,
}) {
  const formatChange = (change) => {
    if (!change) return null;
    const absChange = Math.abs(change);
    if (absChange >= 1000000) return `${(absChange / 1000000).toFixed(1)}M`;
    if (absChange >= 1000) return `${(absChange / 1000).toFixed(1)}K`;
    return absChange.toString();
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
        </div>
        {change !== null && change !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              changeType === 'positive' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {changeType === 'positive' ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {change > 0 ? '+' : ''}
            {formatChange(change)}
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-textSecondary mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{formatValue(value)}</p>
    </div>
  );
}

