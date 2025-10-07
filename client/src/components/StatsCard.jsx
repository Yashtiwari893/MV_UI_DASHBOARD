import React from 'react';

const StatsCard = ({ title, value, Icon, change, changeType }) => {
  const isIncrease = changeType === 'increase';
  return (
    <div className="bg-theme-card/50 border border-white/10 rounded-2xl p-5 transform hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-theme-muted">{title}</p>
        {Icon && <Icon className="text-xl text-theme-accent" />}
      </div>
      <div className="flex items-baseline gap-2 mt-2">
        <p className="text-3xl font-bold text-white">{value}</p>
        {change && (
          <span className={`text-sm font-semibold ${isIncrease ? 'text-theme-ok' : 'text-theme-warn'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
