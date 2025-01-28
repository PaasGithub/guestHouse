'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const NavComponent = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Accommodations', href: '/accommodations' },
    { name: 'Booking', href: '/booking' },
    // { name: 'Contact', href: '#' },
  ].map((item) => ({ ...item, current: pathname === item.href }));

  // Determine the background class based on the pathname
  const navBackgroundClass =
  pathname === '/'
    ? 'bg-transparent'
    : 'bg-gray-100 dark:bg-gray-900 shadow-sm';

  return (
    <nav
      className={classNames(
        'absolute w-full top-0 z-10 mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between',
        navBackgroundClass
      )}
    >
      {/* Logo or Brand Name */}
      <div className="text-xl font-bold">Brand</div>

      {/* Hamburger Menu Icon */}
      <button
        className="block md:hidden p-2 text-gray-700 hover:text-white hover:bg-gray-700 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Navigation Links */}
     
      <div
        className={classNames(
          isOpen ? 'block' : 'hidden',
          'flex flex-col md:flex md:flex-row md:space-x-6 space-y-2 md:space-y-0 font-medium absolute md:static left-0 top-full w-full md:w-auto bg-white/30 dark:bg-gray-900/30 backdrop-blur-md md:backdrop-blur-none md:bg-transparent dark:md:bg-transparent shadow-none py-4 md:py-0 px-4 md:px-0 text-black md:rounded-none'
        )}
      >
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-primary dark:bg-gray-800 text-white'
                  : pathname === '/'
                  ? 'hover:bg-primary hover:dark:bg-gray-700 hover:text-white'
                  : 'hover:bg-primary hover:dark:bg-gray-700 hover:text-white dark:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
              style={
                item.current
                  ? { textShadow: '0' }
                  : pathname === '/'
                  ? { textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)' }
                  : { textShadow: '0' }
              }
            >
              {item.name}
            </a>
          ))}
        </div>
    
    </nav>
  );
};

export default NavComponent;
