import { useState } from 'react';
import up_Arrow from '../../assets/icons8-arrow-24.png';

import { useProductContext } from '../../Context/ProductContext';
import { useSearchContext } from '../../Context/SearchContext';
const Filter = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  //context product
  const {setCategory , setFetch} = useProductContext();
  
  //context search
  const {setIsquery , setFilter } = useSearchContext();

  const handleClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const categories: Record<string, string[]> = {
    Streaming: [],
    Speakers: [],
    Hardware: [],
    Keyboards: ['Wireless', '60%', 'FullSize'],
    'USB Hub & Cables': [],
    'Fans & Cooling': [],
    Gamepad: [],
    'Gaming Accessories': [],
    Headphones: [],
    Headsets: [],
    'Graphic Tablet': [],
    mouse: ['Wired', 'Wireless'],
    'Mouse Pads': [],
  };

  return (
    <>
      <div className="bg-[#ffffff] w-[310px] ms-[20px] rounded-xl">
        <h1 className="text-[#0d4668] ms-[20px] mt-[30px] text-[19px] font-bold">
          Product categories
        </h1>

        <ul className="text-[#767676] ms-[22px]">
          {Object.entries(categories).map(([category, subCats], index) => (
            <li key={index} className="mt-3">
              <div
                className={`flex items-center justify-between cursor-pointer transition-all duration-200 ${
                  activeIndex === index
                    ? 'text-[#1f6fa3] font-semibold'
                    : 'hover:text-[#1f6fa3]'
                }`}
                onClick={() => {
                    handleClick(index);
                    setCategory(category);
                    setFetch(true);
                }}
              >
                {category}
                {subCats.length > 0 && (
                  <img
                    src={up_Arrow}
                    alt="arrow"
                    className={`w-[18px] h-[18px] me-5 transition-transform duration-300 ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </div>

              {activeIndex === index && subCats.length > 0 && (
                <ul className="ms-4 mt-2 text-[15px] text-[#5b5b5b]">
                  {subCats.map((sub, subIndex) => (
                    <li
                      key={subIndex}
                      onClick={()=>{
                        setIsquery(true);
                        setFilter(sub.toLowerCase());
                      }}
                      className="mt-1 cursor-pointer hover:text-[#1f6fa3] transition-all duration-200"
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Filter;
