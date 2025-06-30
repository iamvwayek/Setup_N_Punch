
function Footer() {
    return (
        <div className="bg-black/70 text-white/90 h-10 flex justify-center items-center gap-1 mt-auto border-t-2 sm:text-lg text-sm font-card font-semibold p-3">
            <span className="">SETUP & PUNCH </span>
            <span className="text-xl">
                &copy;
            </span>
            <span>{new Date().getFullYear()}</span>
        </div>
    )
}

export default Footer;
