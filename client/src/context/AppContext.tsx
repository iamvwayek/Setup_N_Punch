import { createContext, useState } from "react"


const SearchContext = createContext<any>(undefined);
function SearchProvider({ children }) {
    const [inputSearch, setInputSearch] = useState("");
    return <SearchContext.Provider value={{ inputSearch, setInputSearch }}>
        {children}
    </SearchContext.Provider>
}
export { SearchProvider, SearchContext };


const FavContext = createContext<any>(undefined);
function FavProvider({ children }) {
    const [fav, setFav] = useState<any>(() => {
        const storedData = localStorage.getItem("jokes");
        if (!storedData) return [];
        return JSON.parse(storedData)
    });
    return <FavContext.Provider value={[fav, setFav]}>
        {children}
    </FavContext.Provider>
}
export { FavProvider, FavContext };