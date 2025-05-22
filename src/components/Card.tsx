import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

import { FavContext } from "../context/AppContext"
import { ScaleContext } from "../context/MainContext";


function Card({ id, setup, punch }) {
  const [fav, setFav] = useContext(FavContext);
  const { setScaleJoke, isScaled, setIsScaled } = useContext(ScaleContext);
  const [isStore, setIsStored] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;


  useEffect(() => {
    fav.map((joke: any) => {
      if (joke.id == id) {
        setIsStored(true)
      }
    })
  }, [])

  useEffect(()=>{
    localStorage.setItem("jokes", JSON.stringify(fav))  
  },[fav])

  async function handleAdd(e: any) {
    e.preventDefault();

    setIsStored(true)

    const data = await fav.filter((joke: any) => {
      return joke.setup.toLowerCase().includes(setup.toLowerCase());
    });
    if (!data.length) {
      setFav((pre: any) => [{ id, setup, punch }, ...pre])
    }
  }

  function handleDelete(e: any) {
    e.preventDefault();
    const updatedJokes = fav.filter((joke: any) => {
      return joke.id !== id
    });
    setFav(updatedJokes)
  };


  function handleScale() {
    setScaleJoke({
      setup: setup,
      punch: punch,
    })
    setIsScaled(!isScaled)
  }

  function handleClickFn(e: any) {
    if (!e.target.closest(".icon")) {
      return handleScale();
    }
  }


  return (
    <div>
      <div className="card rounded-2xl flex flex-col justify-between border-2 p-6 h-48 overflow-hidden hover:scale-102 hover:shadow transition-all ease-in-out duration-200 select-none" onClick={handleClickFn}>
        <div >
          <h1 className="text-[1.4rem] font-sans" >{setup}</h1>
          <p className="text-[1.4rem] pr-2 font-light">{punch}</p>
        </div>
        {currentPath === "/" ?
          <button className=" w-full h-[100vh] sticky bottom-0 pr-1 flex justify-end items-end  z-10" ><svg className="icon fill-white drop-shadow-sm drop-shadow-black hover:fill-black  transition-all ease-in-out duration-200 cursor-pointer" onClick={handleAdd} style={{ fill: isStore ? "black" : "" }} xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" ><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" /></svg></button>
          :
          <button className="w-full h-[100vh] sticky bottom-0 pr-1 flex justify-end items-end  z-10" ><svg className="icon fill-white drop-shadow-sm drop-shadow-black hover:fill-black  transition-all ease-in-out duration-200 cursor-pointer" onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" /></svg></button>
        }
      </div>
    </div>
  )
}

export default Card
