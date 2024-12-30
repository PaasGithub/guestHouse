'use client'
import React from 'react'
import { usePathname } from 'next/navigation'


  
function classNames(...classes: string[]) {
return classes.filter(Boolean).join(' ')
}

const navComponent = () => {
  const pathname = usePathname()

  const navigation = [
      { name: 'Home', href: '/', current: true },
      { name: 'Accomodations', href: '/accomodations', current: false },
      { name: 'Booking', href: '/booking', current: false },
      { name: 'Contact', href: '#', current: false },
  ].map(item => ({
    ...item,
    current: pathname === item.href
  }))

  return (
    <nav className=" absolute w-full top-0 z-10 mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center md:justify-end justify-center">
    {/* Navbar items */}
    <div className="flex space-x-5 font-medium">
      {navigation.map((item) => (
        <a
         key={item.name}
         href={item.href}
         aria-current={item.current ? 'page' : undefined}
         className={classNames(
           item.current ? 'bg-gray-900 text-white' : pathname === '/' ? 'text-gray-700 hover:bg-gray-700 hover:text-white' : 'hover:bg-gray-700 hover:text-white',
           'rounded-md px-3 py-2 text-sm font-medium',
         )}
         style={item.current ? {textShadow: '0'} : pathname === '/' ? {textShadow:'0 1px 2px rgba(0,0,0,0.4)'} : {textShadow:'0'}}
        >
         {item.name}
        </a>
      ))}
    </div>
  </nav>
  )
}

export default navComponent 