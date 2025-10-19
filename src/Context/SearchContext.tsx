import React, { createContext, useState , useContext } from "react";

interface SearchContextTypes { 
    isquery:boolean,
    setIsquery: React.Dispatch<React.SetStateAction<boolean>>,
    fetchData: any[],
    setFetchData: React.Dispatch<React.SetStateAction<[]>>,
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>

} 
export const SearchContext  = createContext<SearchContextTypes | null>(null);

export const SearchProvider = ({children} : {children :React.ReactNode })=>{
    const [isquery , setIsquery] = useState(false);
    const [fetchData , setFetchData] = useState<[]>([]);
    const [filter , setFilter] = useState("");
   return(
    <SearchContext.Provider value={{isquery , setIsquery , fetchData , setFetchData , filter , setFilter}}>
    {children}
</SearchContext.Provider>
   );
}

export const useSearchContext = ()=> {
    const context = useContext(SearchContext);
    if(!context){
        throw new Error ("SearchContext must be used inside a SearchProvider");
    }
    return context;
}