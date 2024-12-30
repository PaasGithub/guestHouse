import React from 'react';
import '../../styles/fonts.css';
import Link from 'next/link';
const HomePage = () => {
    return(
      <div>
        <section className="relative bg-cover bg-center h-screen text-white" style={{ backgroundImage: "url('idyllicHero.jpg')" }}>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            {/* <h1 className="text-4xl font-bold">Establishment Name</h1> */}
            <h1 className="mb-0 text-center" style={{fontFamily: 'Great Vibes',fontSize: '7.25rem', textShadow:'0 2px 10px rgba(0,0,0,0.7)'}}>Idyllic Moments</h1>
            <p className="mb-6" style={{fontFamily: 'Great Vibes',fontSize: '2.50rem', textShadow:'0 1px 2px rgba(0,0,0,0.7)'}}>Guest House</p>
            {/* <button className="mt-4 px-6 py-2 bg-blue-500 rounded">Click Here</button> */}
            <Link className="bg-white text-gray-900 mt-4 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100" href='/booking'>
                  BOOK NOW
            </Link>
          </div>
        </section>

        {/* images */}
        <section>
          
        </section>

      </div>
    );
};

export default HomePage;
