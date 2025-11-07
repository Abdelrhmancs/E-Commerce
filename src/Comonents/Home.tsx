import { useState, useEffect } from "react";
import image_1 from "../assets/c9e53d1e-f445-42a6-a941-ba796effa913.webp";
import image_2 from "../assets/499dd0de-d7f6-430f-a395-0784044467fc.webp";
import image_3 from "../assets/41d4c9c3-2a4a-4a74-a3ce-6a2fa6751c50.webp";
import image_4 from "../assets/587aec4e-20a6-4c9e-947b-c883c5f9ffd7.webp";
import image_5 from "../assets/59a1a2f4-d2cb-4e94-abeb-0eed8f9e1113.webp";
import left from "../assets/icons8-chevron-left-48.png";
import right from "../assets/icons8-chevron-right-48.png";

import box_image_1 from '../assets/0cc4456e-97d0-4b1b-aafd-a2028c4a9f07.webp'; 
import box_image_2 from '../assets/21e5b5bd-90cb-4ed9-bb82-7fff048d3b4e.webp'; 
import box_image_3 from '../assets/8ddcdf18-b7a6-42d8-89ad-2a16d98928fa.webp'; 
import box_image_4 from '../assets/b7826d7e-719f-473e-8cbe-10e6659c0258.webp'; 
const Home = () => {
  const images  = [image_1 , image_2, image_3 , image_4 , image_5];
  const [current , setCurrent] = useState(0)
  
  useEffect(()=> { 
    const interval = setInterval(()=>{
      setCurrent((prev) => (prev + 1) % images.length);
    },3000);
    return () => clearInterval(interval);
  },[images.length]);


  const prevSlide = () => {
    setCurrent((prev)=> (prev - 1 + images.length) % images.length);
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  }
  
  return (
   <div>
     <div className="relative flex items-center justify-center mt-[30px]">
      <img
        src={images[current]}
        alt="slider"
        className="w-[1180px] h-[390px] rounded-3xl object-cover transition-all duration-500"
      />


      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/60"
      >
        <img src={left} alt="left" className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/60"
      >
        <img src={right} alt="right" className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
      
    </div>
    <div className="flex justify-center gap-[12px] mt-[12px]">
          <img className="w-[283px] h-[236px] rounded-3xl cursor-pointer"src={box_image_1} alt="" />
          <img className="w-[283px] h-[236px] rounded-3xl cursor-pointer" src={box_image_2} alt="" />
          <img className="w-[283px] h-[236px] rounded-3xl cursor-pointer" src={box_image_3} alt="" />
          <img className="w-[283px] h-[236px] rounded-3xl cursor-pointer" src={box_image_4} alt="" />
      </div>
   </div>
  );
};

export default Home;
