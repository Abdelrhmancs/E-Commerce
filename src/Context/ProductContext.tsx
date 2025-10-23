import React, { createContext , useState ,useContext } from "react";
import type { Product } from "../Comonents/Products/Product";

interface ProductContextType {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    fetch: boolean;
    setFetch: React.Dispatch<React.SetStateAction<boolean>>;
    details: Product;
    setDetails: React.Dispatch<React.SetStateAction<Product>>; 
    dataCart:Product[];
    setDataCart:React.Dispatch<React.SetStateAction<Product[]>>;
  }

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({children} : {children: React.ReactNode}) => {
    const [category , setCategory] = useState("");
    const [fetch , setFetch] = useState(false);
    const [details , setDetails] = useState<Product>({} as Product);
    const [dataCart , setDataCart] = useState<Product[]>([]);
    return(
        <ProductContext.Provider value={{category , setCategory , fetch , setFetch ,details , setDetails , dataCart , setDataCart}}>
            {children}
        </ProductContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = ()=>{
    const context = useContext(ProductContext);
    if(!context){
        throw new Error ("useProductContext must be used inside a ProductProvider");
    }
    return context;

}