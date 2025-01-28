'use client';

import React, { useEffect, useState } from 'react';
import '../../styles/fonts.css';
import Link from 'next/link';
import { useAccommodations } from './hooks/useAccommodations';
import CountUp from 'react-countup';
import ContactUs from './components/ContactUs';
import { ToastContainer } from 'react-toastify';
const HomePage = () => {
    const { accommodations, isLoading } = useAccommodations();
    const [ total , setTotal ] = useState(0);

    useEffect(() => {
      if (isLoading) {
        console.log('Loading');
        
      } else {
        // Calculate the total number of available units
        const newTotal = accommodations.reduce((acc, room) => acc + room.totalUnitsAvailable, 0);
        setTotal(newTotal);
  
        // Log each room's details
        accommodations.forEach((room) => {
          console.log(room.name, '-', room.totalUnitsAvailable);
          console.log(room.name, '-', room.image.url);
        });
  
        // Log the total number of accommodations
        console.log("Total number of accommodations: " + newTotal);
      }
    }, [accommodations, isLoading]);


    return(
      <div className='bg-gray-100 dark:bg-gray-900'>

        {/* hero section */}
        <section className="relative bg-cover bg-center h-[52rem] text-white" style={{ backgroundImage: "url('idyllicHero.jpg')" }}>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            {/* Title */}
            <h1
              className="mb-0 text-center"
              style={{
                fontFamily: 'GreatVibes',
                fontSize: 'clamp(3rem, 10vw, 7.25rem)', // Responsive font size
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
              }}
            >
              Idyllic Moments
            </h1>

            {/* Subtitle */}
            <p
              className="mb-6 text-center"
              style={{
                fontFamily: 'GreatVibes',
                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', // Responsive font size
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)',
              }}
            >
              Guest House
            </p>

            {/* Button */}
            <Link
              className="bg-primary dark:bg-gray-800 text-white mt-4 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 text-sm md:text-base" // Responsive text size
              href="/booking"
            >
              BOOK NOW
            </Link>
          </div>

          {/* divider */}
          <div className='overflow-hidden absolute w-full text-gray-100' style={{direction:'ltr', left: '0', lineHeight:'0', bottom: '-1px', transform: 'rotate(180deg)'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="none" style={{width: 'calc(200% + 1.3px)', height: '40px', zIndex: '-1', display: 'block', position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
              <path className="fill-gray-100 dark:fill-gray-900" d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"></path>
            </svg>
          </div>
        </section>

        {/* stats section*/}
        <section className='relative h-[27rem]'>

          <div className="text-center my-[100px]">
            {/* Heading */}
            <div>
              <h3
                className="flex flex-col text-2xl md:text-3xl lg:text-4xl leading-tight p-2.5"
                style={{ lineHeight: '1.5' }}
              >
                <span>Experience serenity and comfort in every stay.</span>
                <span>Your perfect getaway awaits.</span>
              </h3>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-24 mt-16">
              {/* Rooms */}
              <div className="flex flex-col">
                <span
                  className="text-4xl md:text-5xl lg:text-6xl font-semibold"
                  style={{ lineHeight: '1.2' }}
                >
                  <CountUp end={total} duration={2} />
                </span>
                <span className="text-lg md:text-xl lg:text-2xl">Rooms</span>
              </div>

              {/* Staff */}
              <div className="flex flex-col">
                <span
                  className="text-4xl md:text-5xl lg:text-6xl font-semibold"
                  style={{ lineHeight: '1.2' }}
                >
                  <CountUp end={40} duration={2} />
                </span>
                <span className="text-lg md:text-xl lg:text-2xl">Staff</span>
              </div>

              {/* Locations */}
              <div className="flex flex-col">
                <span
                  className="text-4xl md:text-5xl lg:text-6xl font-semibold"
                  style={{ lineHeight: '1.2' }}
                >
                  <CountUp end={2} duration={2} />
                </span>
                <span className="text-lg md:text-xl lg:text-2xl">Locations</span>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className='overflow-hidden absolute w-full text-gray-100' style={{direction:'ltr', left: '0', lineHeight:'0', bottom: '-30px'}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="none" style={{width: 'calc(200% + 1.3px)', height: '40px', zIndex: '1', display: 'block', position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
                <path className="fill-gray-100 dark:fill-gray-900" d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"></path>
                <path className="fill-gray-100 dark:fill-gray-900" d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"></path>
                <path className="fill-gray-100 dark:fill-gray-900" d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"></path>
                <path className="fill-gray-100 dark:fill-gray-900" d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"></path>
                <path className="fill-gray-100 dark:fill-gray-900" d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"></path>
                <path className="fill-gray-100 dark:fill-gray-900" d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"></path>
                <path className="fill-gray-100 dark:fill-gray-900" d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"></path>
                <path className="fill-gray-100 dark:fill-gray-900" d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"></path>
                <path className="fill-gray-100 dark:fill-gray-900" d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"></path>
              </svg>
          </div>
        </section>

        {/* rooms section*/}
        <section className="relative h-[52rem] bg-primary px-[37px] py-[75px] text-white">
          <div className="p-4">
            {/* Heading Section */}
            <div className="flex flex-col text-center md:flex-row md:justify-between items-center pb-8">
              <h2 className="text-4xl md:text-6xl">
                <span className="text-gray-300">Our</span> Rooms
              </h2>
              
              {/* <button className="mt-4 md:mt-0 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                Book Now
              </button> */}
            </div>

            {/* Rooms */}
            <div className="flex overflow-x-auto gap-8 pb-4 scroll-container">
              {isLoading ? (
                // Show skeleton loaders while loading
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 text-white overflow-hidden w-full md:w-[40rem]"
                  >
                    <img
                      alt="Loading"
                      className="w-full object-cover shadow-lg bg-gray-200 dark:bg-gray-800"
                      style={{ height: '25rem' }}
                    />
                    <div className="flex justify-between py-4">
                      <div className="flex flex-col">
                        <h3
                          style={{ fontSize: '32px' }}
                          className="bg-gray-200 dark:bg-gray-800 h-8 w-48 animate-pulse"
                        ></h3>
                        <span className="text-gray-300 bg-gray-200 dark:bg-gray-800 h-6 w-24 animate-pulse mt-2"></span>
                      </div>
                      <div className="flex flex-col text-end">
                        <span className="text-gray-300 bg-gray-200 dark:bg-gray-800 h-6 w-16 animate-pulse"></span>
                        <span
                          style={{ fontSize: '42px' }}
                          className="bg-gray-200 dark:bg-gray-800 h-10 w-32 animate-pulse mt-2"
                        ></span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Show actual data when not loading
                accommodations.map((room) => (
                  <div
                    key={room.id}
                    className="flex-shrink-0 text-white overflow-hidden w-full md:w-[40rem]"
                  >
                    <img
                      src={room.image.url}
                      alt={room.name}
                      className="w-full object-cover shadow-lg"
                      style={{ height: '25rem' }}
                    />
                    <div className="flex justify-between py-4">
                      <div className="flex flex-col">
                        <h3 className="text-xl md:text-3xl lg:text-4xl">{room.name}</h3>
                        <span className="text-gray-300 text-md md:text-xl">2 Occupants</span>
                      </div>
                      <div className="flex flex-col text-end">
                        <span className="text-gray-300 text-md md:text-xl">from</span>
                        <span className="text-xl md:text-4xl lg:text-5xl">${room.price}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
        </section>

        {/* contact us section*/}
        <section className="relative h-[70rem] md:h-[50rem] bg-gray-100 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            {/* Section Title */}
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
              Contact Us
            </h2>

            <div className="flex flex-col md:flex-row gap-12">
              {/* Contact Information */}
              <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {/* Phone Number */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Phone Number</p>
                      <p className="text-lg font-semibold">+1 (123) 456-7890</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Email</p>
                      <p className="text-lg font-semibold">info@idyllicmoments.com</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Location</p>
                      <p className="text-lg font-semibold">
                        123 Serenity Lane, Idyllic City
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
                <ToastContainer/>
                <ContactUs/>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className='overflow-hidden absolute w-full text-gray-100' style={{direction:'ltr', left: '0', lineHeight:'0', top: '-40px', transform: 'rotate(180deg)'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="none" style={{width: 'calc(200% + 1.3px)', height: '40px', zIndex: '-1', display: 'block', position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
              <path className="fill-gray-100 dark:fill-gray-900" d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"></path>
              <path className="fill-gray-100 dark:fill-gray-900" d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"></path>
            </svg>
          </div>
        </section>

      </div>
    );
};

export default HomePage;

// /api/media/file/presidential_suite.jpg