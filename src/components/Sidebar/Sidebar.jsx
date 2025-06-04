
// Sidebar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { CiMenuBurger } from "react-icons/ci";
import navLogo from "../../assets/logo.png";
import { useTranslation } from 'react-i18next';  
import profile from '../../assets/profile.jpg'; // Example profile picture, replace with actual path

const icons = {
  Dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
      <rect x="3" y="4" width="7" height="7" />
      <rect x="14" y="4" width="7" height="7" />
      <rect x="14" y="13" width="7" height="7" />
      <rect x="3" y="13" width="7" height="7" />
    </svg>
  ),
  Expenses: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8" />
      <path d="M10 10h4a2 2 0 010 4h-4" />
    </svg>
  ),
  Product: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <path d="M7 8l5 3 5-3" />
    </svg>
  ),
  Employees: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="9" cy="7" r="4" />
      <circle cx="17" cy="7" r="4" />
      <path d="M1 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

const Sidebar = ({ selected, onSelect }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Expenses', path: '/expenses' },
    { name: 'Product', path: '/product' },
    { name: 'Employees', path: '/employee' },
  ];

  const handleClick = (item) => {
    onSelect(item.name);
    navigate(item.path);
    setIsOpen(false);
  };

  return (
    <div className='fixed h-full w-[20%] py-4'>
      <button
        className="md:hidden fixed top-4 left-4 z-[1100]  bg-yellow-400 p-2 rounded-md text-black shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar menu"
      >
        <CiMenuBurger size={24} />
      </button>
 {/* Sidebar content */}
      <div
        className={`fixed top-0 left-0 h-full w-[240px] bg-white border-r border-gray-300 p-3 z-[1100]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-y-0' : '-translate-y-full'} md:translate-y-0 md:static md:shadow-none shadow-lg z-50
          flex flex-col justify-between
        `}
      >
        <div>
          {/* Logo Section */}
          <div className="mt-14 md:mt-0 flex items-center gap-x-2 mb-6">
            <div><img src={navLogo} alt="Groc Shopy" /></div>
            <div>
              <h1 className="font-Roboto-Serif text-2xl font-semibold text-textClr leading-[22px]">{t('sidebar.title')}</h1>
              <p className="text-[10px] text-textClr3 font-normal mt-2.5 font-koh-Santepheap">{t('sidebar.subtitle')}</p>
            </div>
          </div>

          {/* Menu List */}
          <ul className="p-0 mt-7">
            {menuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => handleClick(item)}
                className={`h-10 flex items-center py-2 px-4 mb-2.5 rounded-lg cursor-pointer
                  font-normal font-Roboto text-textClr text-sm
                  hover:bg-Blue hover:text-white hover:font-bold
                  transition-all ease-out duration-300
                  ${selected === item.name ? 'bg-Blue text-white font-semibold' : ''}`}
              >
                <span className="mr-3 flex items-center">{icons[item.name]}</span>
                <span>{t(`sidebar.${item.name}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 p-3  mt-4">
          <img
            src={profile}  
            alt="User Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-textClr">Profile Name</p>
            <p className="text-xs text-textClr3">xyz@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



