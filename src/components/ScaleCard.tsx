import { useContext, useState } from "react"

import { ScaleContext } from "../context/MainContext"

function ScaleCard({ topVal }) {
  const { scaleJoke, setIsScaled } = useContext(ScaleContext);
  const [text, setText] = useState("copy text");

  function handleMouseOver() {
    document.getElementById("tip-tool")?.classList.remove("hidden");
  }

  function handleMouseLeave() {
    document.getElementById("tip-tool")?.classList.add("hidden");
  }

  function handleCopyText() {
    const text = `${scaleJoke.setup}\n${scaleJoke.punch}`;
    navigator.clipboard.writeText(text);
  }

  function handleClickFn(e:any){
    if(!e.target.closest(".icon")){
      setIsScaled(false)
    }else{
      setText("copied!")
      handleCopyText()
    }
  }

  return (
    <div className="absolute bg-black/70 w-full h-[100vh] z-100" style={{ top: topVal }} onClick={handleClickFn}>
      <div className="w-full h-full flex flex-col p-5 justify-center items-center text-4xl text-white">
        <div className=" flex flex-col gap-4 mb-4 select-none">
          <h1 className=" font-bold">{scaleJoke.setup}</h1>
          <p className="font-light">{scaleJoke.punch}</p>
          <button className="w-full flex items-center justify-end gap-3">
            <div id="tip-tool" className=" absolute mr-8 font-light text-xl bg-black/70 w-25 h-8 rounded-2xl hidden transition-all ease-in-out duration-200">{text}</div>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon fill-white text-right cursor-pointer hover:fill-green-500" style={{fill: (text === "copied!") ? "oklch(72.3% 0.219 149.579)" : ""}} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onClick={handleClickFn} height="26px" viewBox="0 -960 960 960" width="26px"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Z" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScaleCard
