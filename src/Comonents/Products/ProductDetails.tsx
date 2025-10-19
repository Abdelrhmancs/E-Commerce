import { Link } from "react-router-dom";
import { useProductContext } from "../../Context/ProductContext";
import { useState } from "react";
const ProductDetails = () => {
  // context of product
  const { details, setCategory, setFetch } = useProductContext();

  const [inc, setInc] = useState(0);
  return (
    <>
      <div className="mt-[20px] flex p-[20px] gap-[30px]">
        <div className=" w-[645px] bg-[#ffffff] rounded-lg">
          <h1 className="text-[">heiil</h1>
          {details && details.images && details.images.length > 0 ? (
            <img
              src={`https://localhost:7211/${details.images[0]}`}
              alt={details.productName}
              className="w-[600px] h-[600px] "
            />
          ) : (
            <p className="text-white text-sm">No image available</p>
          )}
        </div>
        <div className=" w-[645px]  bg-[#ffffff] rounded-lg ">
          <div className="p-[30px]">
            <p className="text-[#767676] mb-[5px] cursor-pointer">
              <Link to="/">
                <span className="me-[10px] ">Home</span>
              </Link>
              /
              <Link to="/product">
                <span
                  className="ms-[10px]"
                  onClick={() => {
                    setCategory(details.productCategory);
                    setFetch(true);
                  }}
                >
                  {details.productCategory}
                </span>
              </Link>
            </p>
            <p className="text-[#242424] font-semibold text-[14px]">
              {details.productDescription}
            </p>
            <p className="text-[#242424] font-semibold text-[34px] mt-[30px]">
              {details.productDescription}
            </p>
          </div>
          <div className="flex mt-[10px]">
            <p className=" line-through text-[25px] ms-[30px]  text-[#bbbbbb] font-extralight">{`${Math.round(
              Number(details.productPrice) + Number(details.productPrice / 4)
            )}.00 LE`}</p>
            <p className=" text-[27px] ms-[15px]  text-[#155b84] font-semibold">{`${
              details.productPrice - details.productPrice / 4
            }.00 LE`}</p>
          </div>
          <div className="text-[#777777] text-[14px] leading-relaxed space-y-2 p-[30px]">
            <ul className="list-disc list-inside space-y-4 text-[14px]">
              <li>
                <strong></strong>
                <span className="font-semibold">GearWare</span> بضمان شهر من
              </li>
              <li className="text-[14px]">
                <strong>Super Lightweight, Only 46g:</strong> R3 ultra-light
                mouse designed for speed and precision. With a low-density
                magnesium and hollowed design, the R3 gaming mouse sheds excess
                weight, weighing in at only 46g. Through advanced metal CNC
                one-piece molding process, while achieving a thinner and lighter
                shell, it also ensures the strength and hand feel of the mouse.
                Perfect for all RPG, FPS, MMO, MOBA, Battle Royale and other
                fast-paced games.
              </li>
              <li>
                <strong>8000Hz Wireless Polling Rate:</strong> Self-developed
                HYPERSPEED WIRELESS technology provides faster data transmission
                and lower click delay. The wireless transmission technology only
                requires a traditional Nano receiver to have an 8000Hz wireless
                rate of return, the response time is reduced from 1ms at 1000Hz
                to as low as 0.125ms. More responsive cursor movements captured
                with faster trigger response guarantees unparalleled
                performance.
              </li>
              <li>
                <strong>Tri-mode Connectivity:</strong> tay Connected, Stay
                Unbeatable – Utilizing HYPERSPEED Wireless technology, the R3
                mouse provides versatile connection options, ranging from
                ultra-fast 2.4G to agile Bluetooth, and even a steadfast wired
                connection, which can be easily switched through the button on
                the back of the mouse. Coupled with prolonged 200Hrs battery
                life, this mouse ensures you’re always ready, always dominant.
              </li>
              <li>
                <strong>PixArt PAW3395 & 100% Virgin Grade PTFE:</strong>{" "}
                Equipped with the PixArt’s latest PAW3395 sensor, providing
                top-notch accuracy and precision for fast-paced, competitive
                games, capable of 26,000 programmable DPI, 650 IPS speed, 50g
                acceleration. With zero-additive PTFE feet, give your mouse the
                most consistent slide ever, while providing better stopping
                power.
              </li>
              <li>
                <strong>Kailh GM 8.0 Switches & TTC Encoder:</strong> Features
                ultra-crispy clicks and Over 80 million cycles by using the
                top-end Kailh GM 8.0 switches. It is also equipped with a TTC
                scroll wheel encoder which gives precise stepping. All of this
                ensures you get excellent tactility in your favorite games.
              </li>
              <li>
                <strong>Cloud Driver:</strong> Customized R3 gaming mouse, born
                for e-sports. Equipped with innovative and intelligent
                cloud-driven webpage, bid farewell to traditional driver
                software, no need to download and install. The open-source
                driver automatically identifies your computer system, and allows
                for DPI adjustment, rate of return, competitive mode, customized
                buttons, macro recording, personalized key mapping and other
                advanced functions.
              </li>
            </ul>
          </div>
          <div className="ps-[30px] flex gap-[10px]">
            <div className="flex items-center justify-center w-[110px] h-[44px] rounded-lg border border-gray-300 overflow-hidden shadow-sm">
              <button
                onClick={() => setInc(inc > 0 ? inc - 1 : inc)}
                className="w-[36px] h-full flex items-center justify-center bg-gray-100 text-gray-600 text-lg font-semibold hover:bg-[#007bc4] hover:text-white transition duration-300"
              >
                -
              </button>

              <span className="w-[38px] text-center text-gray-700 font-medium select-none">
                {inc}
              </span>

              <button
                onClick={() => setInc(inc + 1)}
                className="w-[36px] h-full flex items-center justify-center bg-gray-100 text-gray-600 text-lg font-semibold hover:bg-[#007bc4] hover:text-white transition duration-300"
              >
                +
              </button>
            </div>
            <button className="bg-[#007bc4] w-[126px]  text-[13px] font-semibold rounded-lg hover:bg-[#0d4668] transition duration-300">
            Add to cart

            </button>
            <button className="bg-[#007bc4] w-[100px]  text-[13px] font-semibold rounded-lg hover:bg-[#0d4668] transition duration-300">
            Buy now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
