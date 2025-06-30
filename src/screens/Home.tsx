import { useContext, useEffect, useState } from "react";

import Card from "../components/Card";

import { SearchContext } from "../context/AppContext";
import { TypeContext, SideBarContext } from "../context/MainContext";


function Home() {
  const [jokes, setJokes] = useState<any>([]);
  const [error, setError] = useState<string>("");

  const { inputSearch } = useContext(SearchContext)
  const { type, isLoading, setIsLoading, activeType } = useContext(TypeContext)
  const { setSearchVal } = useContext(SideBarContext)


  useEffect(() => {
    setSearchVal("")
    setError("")
    setIsLoading(false)
    const activeBtn = document.getElementsByClassName(activeType)
    activeBtn[0]?.classList.add("btn-active")
  }, [])

  useEffect(() => {

    async function apiCall() {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        const response = await fetch(`https://official-joke-api.appspot.com/jokes/${type}`, { signal: signal });
        if (!response.ok) {
          return setError("404 Not a Joke!")
        }
        const jokes = await response.json();
        setIsLoading(true)
        setJokes(jokes)

        return () => {
          controller.abort();
        }

      } catch (error) {
        setError("Server is busy. Try after sometime.")

      }
    }
    apiCall()
  }, [type]);

  // search logic

  const searchedJoke = jokes.filter((joke: any) => {
    return joke.setup.toLowerCase().includes(inputSearch.toLowerCase()) || joke.punchline.toLowerCase().includes(inputSearch.toLowerCase());
  });

  // error msg

  if (error.length) {
    return <div className=" w-full h-[100vh] font-card font-bold col-2 lg:text-4xl text-2xl pl-5  flex justify-center items-center">{error}</div>
  }

  // loading logic

  if (!isLoading) {
    return <div className=" w-full h-[100vh] flex justify-center items-center ">
      <img src="/spinner.gif" alt="loader" className="lg:w-26 w-21" />
    </div>
  }



  return (
    <div className="my-6 mx-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-default">
      {searchedJoke.length ?
        searchedJoke.map((joke: any) => {
          return <Card key={joke.id} id={joke.id} setup={joke.setup} punch={joke.punchline} />
        })
        : jokes.map((joke: any) => {
          return <Card key={joke.id} id={joke.id} setup={joke.setup} punch={joke.punchline} />
        })}
    </div>
  )
}

export default Home
