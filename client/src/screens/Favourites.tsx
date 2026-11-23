import { useEffect, useContext } from "react";

import Card from "../components/Card";

import { FavContext, SearchContext } from "../context/AppContext";
import { SideBarContext } from "../context/MainContext";

function Favourites() {
  const [fav] = useContext(FavContext);
  const { setSearchVal } = useContext(SideBarContext)
  const { inputSearch } = useContext(SearchContext)

  useEffect(() => {
    setSearchVal("")
  }, [])

  useEffect(() => {
    localStorage.setItem("jokes", JSON.stringify(fav))
  }, [fav])


  if (!fav.length) {
    return <div className=" w-full h-[100vh] font-card font-bold col-2 lg:text-4xl text-2xl  flex justify-center items-center">No Favourite Jokes</div>
  }

  const searchedJoke = fav.filter((joke: any) => {
    return joke.setup.toLowerCase().includes(inputSearch.toLowerCase()) || joke.punch.toLowerCase().includes(inputSearch.toLowerCase());
  });

  return (
    <div className="my-6 mx-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-default">
      {searchedJoke.length ?
        searchedJoke.map((joke: any) => {
          return <Card key={joke.id} id={joke.id} setup={joke.setup} punch={joke.punch} />
        })
        :
        fav.map((joke: any) => {
          return <Card key={joke.id} id={joke.id} setup={joke.setup} punch={joke.punch} />
        })}
    </div>
  )
}

export default Favourites
