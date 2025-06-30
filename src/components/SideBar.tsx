import { useContext, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";

import { SideBarContext, TypeContext } from "../context/MainContext"
import { SearchContext } from "../context/AppContext";

function SideBar() {
    const { setSearchVal, searchVal, isSideBarPresent, setIsSideBarPresent } = useContext(SideBarContext);
    const { setType, setActiveType, activeType } = useContext(TypeContext)
    const { setInputSearch } = useContext(SearchContext)

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        const activeBtn = document.getElementsByClassName(activeType)
        activeBtn[1]?.classList.add("btn-active")
    },[])

    const handleSearchClick = () => {
        return setInputSearch(searchVal);
    }

    function handleCloseBar() {
        setIsSideBarPresent(!isSideBarPresent)
    }

    function handleFilter(e: any) {
        e.preventDefault();
        setIsSideBarPresent(!isSideBarPresent)
        setSearchVal("")

        // active btn logic
        const btns = document.querySelectorAll("button");
        btns.forEach((btn) => {
            btn.classList.remove("btn-active")
        })
        setActiveType(e.target.classList[0])

        // filter btns logic
        const clickedType = e.target.value;
        if (clickedType !== "random") {
            return setType(clickedType + "/ten")
        }

        return setType("random/100")
    }


    return (
        <div className="absolute flex w-[100%] h-[100vh] top-15 left-0 z-20 font-card">
            <div className="bg-black/70 sm:hidden flex flex-col items-center h-full slide-bar shadow-2xl">
                {currentPath === "/favourites" ?
                    <Link to="/" className="my-5 mt-5 bg-white/90 text-black/70 font-semibold text-[18px] text-center  w-[80%] rounded-full p-2 hover:bg-[#fffd8e] border-2 transition-all ease-in-out duration-250" onClick={() => setIsSideBarPresent(!isSideBarPresent)}>
                        Home
                    </Link>
                    :
                    <Link to="/favourites" className="my-5 bg-white/90 text-black/70 font-semibold text-[18px] text-center  w-[80%] rounded-full p-2 hover:bg-[#fffd8e] border-2 transition-all ease-in-out duration-250" onClick={() => setIsSideBarPresent(!isSideBarPresent)}>
                        Favourites
                    </Link>
                }
                <div className="search-bar w-full flex justify-center my-5">
                    <input type="text" placeholder='Search "jokes" by words' className="w-[90%] bg-white p-3 focus:outline-0" onChange={(e) => {
                        return setSearchVal(e.target.value);
                    }} value={searchVal} onKeyDown={(e) => {
                        if (e.code == "Enter") {
                            return handleSearchClick();
                        }
                    }} />
                </div>
                {currentPath === "/" &&
                    <div className=" text-white text-[16px] w-[80%] lg:text-lg flex flex-col gap-4 px-4 font-semibold">
                        <button className="random px-4 p-1 btn-hover" onClick={handleFilter} value="random">All</button>
                        <button className="general px-4 p-1 btn-hover" onClick={handleFilter} value="general">General</button>
                        <button className="knock-knock px-4 p-1 btn-hover" onClick={handleFilter} value="knock-knock">Knock-Knock</button>
                        <button className="programming px-4 p-1 btn-hover" onClick={handleFilter} value="programming">Programming</button>
                        <button className="dad px-4 p-1 btn-hover" onClick={handleFilter} value="dad">Dad</button>
                    </div>
                }
            </div>
            <div className="rest-area flex sm:hidden w-full h-full bg-black/20" onClick={handleCloseBar}></div>

        </div>

    )
}

export default SideBar