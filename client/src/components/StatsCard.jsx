import React from 'react';

// Props me hum Title, Value, aur Icon receive karenge
const StatsCard = ({ title, value, Icon }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        {/* Icon ko yahan render karenge */}
        {Icon && <Icon className="text-2xl text-gray-500" />}
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default StatsCard;