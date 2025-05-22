import { createContext, useState } from "react"


const ScaleContext = createContext<any>(undefined);
function ScaleProvider({ children }) {
    const [scaleJoke, setScaleJoke] = useState<object>({
        setup: "",
        punch: ""
    });
    const [isScaled, setIsScaled] = useState<boolean>(false);
    return <ScaleContext.Provider value={{ scaleJoke, setScaleJoke, isScaled, setIsScaled }}>
        {children}
    </ScaleContext.Provider>
}
export { ScaleProvider, ScaleContext };


const SideBarContext = createContext<any>(undefined);
function SideBarProvider({ children }) {
    const [isSideBarPresent, setIsSideBarPresent] = useState<boolean>(false);
    const [searchVal, setSearchVal] = useState<string>("");
    return <SideBarContext.Provider value={{ isSideBarPresent, setIsSideBarPresent, searchVal, setSearchVal }}>
        {children}
    </SideBarContext.Provider>
}
export { SideBarProvider, SideBarContext };


const TypeContext = createContext<any>(undefined);
function TypeProvider({ children }) {
    const [type, setType] = useState<string>("random/100");
    const [activeType, setActiveType] = useState<string>("random");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return <TypeContext.Provider value={{ type, setType, isLoading, setIsLoading, activeType, setActiveType }}>
        {children}
    </TypeContext.Provider>
}
export { TypeProvider, TypeContext };