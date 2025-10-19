import { useState , useEffect } from "react";
import search from "../../assets/icons8-search-30.png";
import axios from "axios";

import { useSearchContext } from "../../Context/SearchContext";

const Search = () => {

  // context of search
  const {setIsquery , setFetchData , isquery , filter} =  useSearchContext();
  
  interface SearchDto {
    query: string;
    pageNumber: string;
    sortBy: string;
  }
  
  const [dataSearch, setDataSearch] = useState<SearchDto>({
    query: "",
    pageNumber: "1",
    sortBy: "2",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setDataSearch({
      ...dataSearch,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams({
        query: dataSearch.query || filter,
        pageNumber: dataSearch.pageNumber,
        sortBy: dataSearch.sortBy,
      }).toString();

      const response = await axios.get(
        `https://localhost:7211/Product/Search?${params}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFetchData(response.data);
      setIsquery(true);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  

  useEffect(()=>{
    if(isquery){
      handleSearch();
      setIsquery(false);
    }
  },[isquery]);
  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        name="query"
        value={dataSearch.query}
        onChange={handleChange}
        className="w-[500px] h-[45px] rounded-l-md px-4 bg-white border border-black/20 text-zinc-900 placeholder-[var(--color-text-secondary)] outline-none focus:border-black/40 transition"
        placeholder="Search for anything..."
      />
      <button
        type="button"
        onClick={()=> {
          handleSearch();
        }}
        className="w-[50px] h-[45px] flex items-center justify-center bg-[#007bc4] rounded-r-md hover:bg-[#0d4668] transition duration-300"
      >
        <img src={search} alt="search" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Search;
