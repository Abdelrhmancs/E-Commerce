import close from '../../assets/icons8-close-24.png';
import cart from "../../assets/icons8-add-shopping-cart-96.png";
import { useProductContext } from "../../Context/ProductContext";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Cart = () => {
  const { dataCart, setDataCart } = useProductContext();

  const [inc , setInc] = useState(1);

  const fixedCart = dataCart.map((p) => ({
    ...p,
    quantity: p.quantity ?? 1,
  }));

  
  if(fixedCart.length !== 0){
     return (
    <div className="mt-[20px] flex p-[20px] gap-[30px] h-[2000px]">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-[870px] bg-white rounded-lg">
        <table className="mt-[18px] border-collapse ms-[15px]">
          <thead className="border-b-2 border-[#eee] h-[64px]">
            <tr className="text-[#0d4668] text-[18px]">
              <th className="w-[40px]"></th>
              <th className="w-[104px]"></th>
              <th className="w-[400px] text-start ps-2">Product</th>
              <th className="w-[90px]">Price</th>
              <th className="w-[104px]">Quantity</th>
              <th className="w-[92px]">Subtotal</th>
            </tr>
          </thead>

          {fixedCart.map((product) => (
            <tbody
              key={product.id}
              className="text-[#0d4668] border-b-2 border-[#eee] h-[64px]"
            >
              <tr>
                <td
                  className="text-center  ps-[12px]"
               
                >
                  <img
                     onClick={() => {
                    setDataCart((prev) =>
                      prev.filter((p) => p.id != product.id)
                    );
                    toast.success("🗑️ Product removed!", {
                      position: "top-center",
                      duration: 5000,
                    });
                  }}
                  className='w-[15px] cursor-pointer' src={close} alt="x" />
                </td>
                <td>
                  <img
                  
                    src={`https://localhost:7211/${product.images}`}
                    alt="img"
                  />
                </td>
                <td className="ps-2 text-[14px] font-semibold">
                  {product.productDescription}
                </td>
                <td className="text-center text-[15px] font-semibold">
                  {product.productPrice}.00 EL
                </td>
                <td className="ps-[19px]">
                  <div className="flex items-center justify-center w-[65px] h-[40px] rounded-lg border border-gray-300 overflow-hidden shadow-sm">
                    <button
                      onClick={() => {
                        setDataCart((prev) =>
                          prev.map((p) =>
                            p.id === product.id
                              ? {
                                  ...p,
                                  quantity:
                                    (p.quantity ?? 1) > 1
                                      ? (p.quantity ?? 1) - 1
                                      : 1,
                                }
                              : p
                          )
                        );
                        setInc(inc + product.quantity * product.productPrice)
                       if(product.quantity != 1){
                         toast.success("🗑️ Product removed!", {
                          position: "top-center",
                          duration: 2000,
                        });
                       }
                      }}
                      className="w-[20px] h-full flex items-center justify-center bg-gray-100 text-gray-600 text-lg font-semibold hover:bg-[#007bc4] hover:text-white transition duration-300"
                    >
                      -
                    </button>

                    <span className="w-[25px] text-center text-gray-700 font-medium select-none">
                      {product.quantity}
                    </span>

                    <button
                      onClick={() => {
                        setDataCart((prev) =>
                          prev.map((p) =>
                            p.id === product.id
                              ? { ...p, quantity: (p.quantity ?? 1) + 1 }
                              : p
                          )
                        );
                        setInc(inc + (product.quantity) * product.productPrice)
                        toast.success("Product Added!", {
                          position: "top-center",
                          duration: 2000,
                        });
                      }}
                      className="w-[20px] h-full flex items-center justify-center bg-gray-100 text-gray-600 text-lg font-semibold hover:bg-[#007bc4] hover:text-white transition duration-300"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  {(product.quantity * product.productPrice).toFixed(2)} EL
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <div className="w-[425px] bg-white rounded-lg">
        <div className='w-full '>
            <h1 className='text-[22px] text-[#0d4668] font-bold p-3 '>Cart Totals</h1>
            </div>
        <div className='border-b-2 border-[#eee] h-[64px] '>
            <p>Subtotal</p>
            <p></p>
        </div>
        <div>
            <p>Shipping</p>
            <p>Enter your address to view shipping options.
                Calculate shipping</p>
        </div>
        <div>
            <p>Total</p>
            <p className='text-black'>{inc}</p>
        </div>
      </div>
    </div>
  );
  }else {
    return(
        <div className='flex flex-col justify-center items-center'>
            <img className='w-[96px] mt-[100px]' src={cart} alt="cart" />
            <h1 className='text-[48px] text-[#242424] font-semibold'>Your cart is currently empty.</h1>
            <p className='w-[500px] text-[#777777] text-[15px] text-center'>Before proceed to checkout you must add some products to your shopping cart. You will find a lot of interesting products on our "Shop" page.</p>
           <Link to="/product">
            <button
            className='bg-[#007bc4] w-[170px] h-[48px] rounded-md mt-[30px] hover:bg-[#0d4668] duration-300 transition'
            >Return to shop</button>
           </Link>
        </div>
    )
  }
};

export default Cart;
