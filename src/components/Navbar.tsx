import { useContext, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import { SearchContext } from "../context/AppContext";
import { SideBarContext, TypeContext } from "../context/MainContext";

function Navbar() {
    const { setInputSearch } = useContext(SearchContext);
    const { type, setType, setIsLoading, setActiveType } = useContext(TypeContext)
    const { isSideBarPresent, setIsSideBarPresent, searchVal, setSearchVal } = useContext(SideBarContext);

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        setInputSearch(searchVal);
    }, [searchVal]);

    useEffect(() => {
        setIsLoading(false)
    }, [type]);

    function handleFilter(e: any) {
        e.preventDefault();
        setSearchVal("")

        // active btn logic
        const btns = document.querySelectorAll("button");
        btns.forEach((btn) => {
            btn.classList.remove("btn-active")
        })
        e.target.classList.add("btn-active");
        setActiveType(e.target.classList[0])

        // filter btns logic
        const clickedType = e.target.value;
        if (clickedType !== "random") {
            return setType(clickedType + "/ten")
        }

        return setType("random/100")

    }

    function handleBar(e: any) {
        e.preventDefault();
        setIsSideBarPresent(!isSideBarPresent);
    }


    return (
        <nav className="w-full">
            <div className="flex items-center sm:justify-between md:px-10 sm:px-4 px-3 shadow">
                <div className="logo lg:text-3xl text-2xl w-full sm:w-fit flex justify-between font-bold p-3 ">
                    <button className="flex flex-col justify-center gap-1 sm:hidden cursor-pointer" onClick={handleBar}>
                        <div className="bar w-7 h-[3px] bg-black transition-all ease-in-out duration-100"></div>
                        <div className="bar w-7 h-[3px] bg-black transition-all ease-in-out duration-100"></div>
                        <div className="bar w-7 h-[3px] bg-black transition-all ease-in-out duration-100"></div>
                    </button>

                    <Link to="/">SETUP & PUNCH</Link>
                </div>
                <div className="hidden sm:block text-[18px] lg:text-xl md:text-lg mr-[8.5%]">
                    <input className="lg:w-90 md:w-55 lg:h-8 md:h-7.5 px-3 bg-black/5 rounded-full focus:outline-0 focus:shadow lg:focus:w-110 md:focus:w-70 transition-all ease-out duration-300" type="text" placeholder='Search "jokes" by words' onChange={(e) => {
                        return setSearchVal(e.target.value);
                    }} value={searchVal} />
                </div>
                {currentPath === "/favourites" ?
                    <Link to="/" className="hidden sm:block bg-black text-white text-[17px] lg:text-lg rounded-full lg:px-4 px-3 lg:py-1.5 py-1 hover:invert border-2 transition-all ease-in-out duration-250">
                        Home
                    </Link>
                    :
                    <Link to="/favourites" className="hidden sm:block bg-black text-white text-[17px] lg:text-lg rounded-full lg:px-4 px-3 lg:py-1.5 py-1 hover:invert border-2 transition-all ease-in-out duration-250">
                        Favourites
                    </Link>
                }
            </div>


            {currentPath === "/" &&
                <div className="hidden sm:flex w-full justify-center mt-8">
                    <div className="bg-black text-white text-[16px] lg:text-lg grid-cols-1 justify-center gap-4 shadow-lg px-4 rounded-full">
                        <button className="random px-4 p-1 btn-hover" onClick={handleFilter} value="random">All</button>
                        <button className="general px-4 p-1 btn-hover" onClick={handleFilter} value="general">General</button>
                        <button className="knock-knock px-4 p-1 btn-hover" onClick={handleFilter} value="knock-knock">Knock-Knock</button>
                        <button className="programming px-4 p-1 btn-hover" onClick={handleFilter} value="programming">Programming</button>
                        <button className="dad px-4 p-1 btn-hover" onClick={handleFilter} value="dad">Dad</button>
                    </div>
                </div>
            }

        </nav>
    )
}

export default Navbar
