'use client';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import '../../../styles/fonts.css'; 
import { Accommodation, Media } from "../../../../payload-types";

interface RoomCardProps {
  room: Accommodation;
}
function isMedia(image: number | Media): image is Media {
    return typeof image !== 'number' && 'url' in image;
  }

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const router = useRouter();

  return (
  
    <div className="grid-item wow fadeInUp animated" data-wow-delay="0.3s">
        <div className="item-inner relative overflow-hidden group shadow-lg hover:shadow-xl transition-shadow">
            {/* Thumbnail */}
            <div className="relative h-96 w-full">
                <Image
                    src={isMedia(room.image) && room.image.url ? room.image.url : '/idyllicHero.jpg'}
                    alt={room.name}
                    className=""
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="opacity-0 hover:opacity-100 absolute z-20 bg-primary dark:bg-gray-800 bg-cover bg-no-repeat h-full w-full top-0 transition-opacity duration-500">
                <div className="opacity-100 z-[4] mt-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 absolute text-white text-center">
                    <div className="text-[14px] mb-2">From</div>
                    <h3 className="text-[40px] leading-none my-0">${room.price}</h3>
                    <div className="text-[14px] mb-6 ">Per Night</div>
                    <button
                        className="inline-block text-center font-medium uppercase px-5 text-[12px] tracking-[2px] rounded-none min-h-[37px] leading-[37px] border border-white/35"
                        onClick={() => {
                            router.push(`/accommodations/${room.id}`);
                          }}
                    >
                        View Room
                    </button>
                </div>
            </div>

            <div className="bottom-0 left-0 right-0 text-center text-white absolute bg-gradient-to-t from-[#ab8965] to-[#ab896500] dark:from-gray-800 dark:to-gray-800/0 h-[40%] w-full transition-all duration-500 py-16">
                <h3 className="leading-[1.4em] text-[30px] mb-0">{room.name}</h3>
                <div className="text-center space-x-4 text-[14px]">
                    <span>{room.totalNumberOfGuests} Guests</span>
                    <span>35 Feet Size</span>
                </div>
                {/* <div className="capacities text-center mt-2">
                    {room.features.map((feature, index) => (
                    <span key={index} className="capacity block text-sm text-gray-600">
                        • {feature.feature}
                    </span>
                    ))}
                </div> */}
                
            </div>
            
        </div>
    </div>    
  );
};

export default RoomCard;