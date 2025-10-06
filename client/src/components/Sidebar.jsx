import React from 'react';

const Sidebar = () => {
  // Dummy data for navigation links
  const navLinks = ['Dashboard', 'Analytics', 'Integrations', 'Reports', 'Settings'];

  return (
    <div className="w-64 bg-gray-900 h-screen p-5 flex flex-col">
      <div className="text-white text-2xl font-bold mb-10">MV Digital AI</div>
      <nav>
        <ul>
          {navLinks.map(link => (
            <li key={link} className="mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-200 text-lg">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;