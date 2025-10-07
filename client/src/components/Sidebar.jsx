import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaEdit, FaChartBar, FaPlug } from 'react-icons/fa'; // Using react-icons

const items = [
  { to: '/', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { to: '/content-studio', label: 'Content Studio', icon: <FaEdit /> },
  { to: 'analytics', label: 'Analytics', icon: <FaChartBar /> },
  { to: '/integrations', label: 'Integrations', icon: <FaPlug /> },
];

const Sidebar = () => {
  return (
    <aside className="w-64 p-5 bg-theme-card/30 border-r border-white/5 flex-shrink-0">
      <div className="mb-8 font-bold text-lg text-theme-accent">
        MV DIGITAL WORK
      </div>

      <nav className="flex flex-col gap-2">
        {items.map(i => (
          <NavLink
            key={i.to}
            to={i.to}
            end // 'end' prop ensures only exact route is active for '/'
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg font-semibold transition-colors
              ${isActive
                ? 'bg-theme-accent/10 text-theme-accent border border-theme-accent/20'
                : 'text-theme-muted hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="w-5 text-center">{i.icon}</span>
            <span>{i.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto text-sm text-theme-muted flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-theme-ok shadow-[0_0_8px_rgba(61,220,151,0.5)]"></div>
        <span>All systems go.</span>
      </div>
    </aside>
  );
};

export default Sidebar;
