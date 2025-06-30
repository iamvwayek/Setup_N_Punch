import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { motion, useScroll } from "motion/react";
import { ToastContainer } from 'react-toastify';

import Home from "./screens/Home";
import Favourites from "./screens/Favourites";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import ScaleCard from "./components/ScaleCard";

import TopBtn from "./controllers/TopBtn";

import { FavProvider, SearchProvider } from "./context/AppContext";
import { SideBarContext, ScaleContext, TypeContext } from "./context/MainContext";

function App() {

  const { isSideBarPresent, setIsSideBarPresent, setSearchVal, searchVal } = useContext(SideBarContext);
  const { isScaled } = useContext(ScaleContext);
  const { activeType } = useContext(TypeContext);

  const [showBar, setShowBar] = useState(false)

  function watchInnerWidth() {
    if (window.innerWidth > 639) {
      setIsSideBarPresent(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", watchInnerWidth)
    return () => { return window.removeEventListener("resize", watchInnerWidth) }
  }, [])

  // scroll TOP-bar

  function watchScrollTop() {
    if (document.documentElement.scrollTop > 0) {
      setShowBar(true)
    };
  }

  useEffect(() => {
    window.addEventListener("scroll", watchScrollTop)
    return () => { return window.removeEventListener("scroll", watchScrollTop) }
  }, [])



  useEffect(() => {
    const btn = document.querySelectorAll(".bar");
    if (isSideBarPresent) {
      // active button
      const activeBtn = document.getElementsByClassName(activeType)
      activeBtn[1]?.classList.add("btn-active")

      // side bar logic
      document.body.style.overflow = "hidden"
      btn[0].classList.add("bar-1");
      btn[1].classList.add("bar-2");
      btn[2].classList.add("bar-3");
    } else {
      // search logic
      setSearchVal(searchVal)

      // active button
      const activeBtn = document.getElementsByClassName(activeType)
      activeBtn[0]?.classList.add("btn-active")

      // side bar logic
      document.body.style.overflow = "auto"
      btn[0].classList.remove("bar-1");
      btn[1].classList.remove("bar-2");
      btn[2].classList.remove("bar-3");
    }

  }, [isSideBarPresent]);

  useEffect(() => {
    if (isScaled) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isScaled])

  // framer-motion
  const { scrollYProgress } = useScroll();

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col">
        {showBar && <motion.div style={{ scaleX: scrollYProgress }} className="h-1.5 w-full bg-black fixed top-0 left-0 origin-left z-20"></motion.div>}
        <ToastContainer theme="dark" position="bottom-left" autoClose={2000} />
        {isScaled && <ScaleCard topVal={document.documentElement.scrollTop} />}
        <SearchProvider>
          <FavProvider>
            <Router>
              <Navbar />
              {isSideBarPresent && <SideBar />}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favourites" element={<Favourites />} />
              </Routes>
              <TopBtn />
              <Footer />
            </Router>
          </FavProvider>
        </SearchProvider>
      </div>
    </>
  )
}

export default App
