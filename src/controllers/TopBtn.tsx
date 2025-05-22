import { useEffect, useState } from "react"

function TopBtn() {
    const [isActive, setIsActive] = useState<boolean>(false)

    function handleTopScroll() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    function handleTopBtn() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", handleTopScroll)
        return () => { return window.removeEventListener("scroll", handleTopScroll) }
    }, [])

    return (
        <div className="fixed w-full mb-5 bottom-0 z-10">
            <button style={{ display: isActive ? "flex" : "none" }} className="w-full justify-end pr-4">
                <div className="w-12 border-2 flex justify-center items-center bg-black/90 py-2 rounded-full hover:border-white hover:invert transition-all ease-in-out duration-150" onClick={handleTopBtn}>
                <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
                </div>
            </button>
        </div>
    )
}

export default TopBtn
