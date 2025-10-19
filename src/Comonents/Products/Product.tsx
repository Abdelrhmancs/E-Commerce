import axios from "axios";
import { useState  , useEffect} from "react";
import { Link } from "react-router-dom";
// icons
import star from "../.././assets/star.png";
import cart from "../../assets/icons8-cart-48.png";

// components 
import Filter from "../Filter/Filter";

//context
import { useProductContext } from "../../Context/ProductContext";
import { useSearchContext } from "../../Context/SearchContext";
  //interfaces
  export interface Product {
    id: number ;
    images: any[];
    productCategory: string;
    productDescription: string;
    productName: string;
    productPrice: number;
    productStockQuantity: number;
  }
const Mouse = () => {



  // context of product 
  const {category , fetch , setFetch , setDetails} = useProductContext();
  // context of Search
  const {setIsquery ,fetchData , isquery} = useSearchContext();
  
  // state 
  const [data, setData] = useState<Product[]>([]);

  const handelsubmet = async () => {
    axios
      .get<Product[]>("https://localhost:7211/Product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((e) => {
        setData(e.data);
        console.log(e.data);
      })
      .catch((err) => {
        alert("there are errors " + err);
      });
  };

  useEffect(()=>{
    if(fetch){
      handelsubmet();
      setFetch(false);
    }else if(isquery){
      setData(fetchData);
      setIsquery(false);
      console.log(data);
    }
  
  } , [fetch , isquery]);
  
  
  return (
    <>
      <div className="flex  mt-[30px]">
        <Filter/>
      <div className="grid grid-cols-4  gap-[16px] ms-[20px]">
        {data
          .filter((e) => e.productCategory.toString() === category)
          .map((product) => (
            <div
              key={product.id}
              className=" flex flex-col  items-center bg-[#ffffff] w-[233px] h-[450px] rounded-lg mb-[16px] p-[15px] hover:translate-y-1 duration-500 transition"
            >
              <img
                className="w-[201px] h-[201px] mt-[10px] rounded-lg"
                src={`https://localhost:7211/${product.images[0]}`}
                alt={product.productName}
              />
              <div className="h-[148px] flex flex-col ">
                <Link to="/details">
                <h1
                onClick={()=>setDetails(product)}
                className="text-[16px] mt-[20px] line-clamp-2 ms-[10px] text-[#242424] font-semibold hover:text-[#bbbbbb]  transition duration-300 cursor-pointer max-w-[200px]">
                  {product.productName}
                </h1>
                </Link>
                <h1 className="text-[16px]  ms-[10px] text-[#bbbbbb] font-semibold ">
                  {product.productCategory}
                </h1>
                <div className="flex gap-1 ms-[10px] mt-[10px]">
                  <img className="w-[14px] h-[14px]" src={star} alt="star" />
                  <img className="w-[14px] h-[14px]" src={star} alt="star" />
                  <img className="w-[14px] h-[14px]" src={star} alt="star" />
                  <img className="w-[14px] h-[14px]" src={star} alt="star" />
                  <img className="w-[14px] h-[14px]" src={star} alt="star" />
                </div>
                <div className="flex mt-[10px]">
                  <p className=" line-through text-[12px] ms-[10px]  text-[#bbbbbb] font-semibold">{`${Math.round(
                    Number(product.productPrice) +
                      Number(product.productPrice / 4)
                  )}.00 LE`}</p>
                  <p className=" text-[14px] ms-[10px]  text-[#155b84] font-semibold">{`${product.productPrice}.00 LE` }</p>
                </div>
              </div>
              <Link to="/cart">
                <button
                className="group mt-[20px] bg-[#007bc4]  w-[201px] h-[42px] rounded-lg text-[16px] font-semibold flex items-center justify-center overflow-hidden relative">
                  <span className="text-[#ffffff] transition-all duration-300 group-hover:translate-y-[-150%] group-hover:opacity-0">
                    ADD TO CART
                  </span>

                  <img
                    src={cart}
                    alt="cart"
                    className="absolute opacity-0 translate-y-[150%] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 w-[24px] h-[24px]"
                  />
                </button>
              </Link>
            </div>
          ))}
      </div>
        </div>  
    </>
  );
};
export default Mouse;
