export default function Navbar() {
  return (
    <>
      <div className="pl-8 pt-6 md:flex w-full pr-8">
        <nav className="w-full">
          <ul className="flex flex-col sm:flex-row gap-6 sm:gap-20 items-center sm:items-center">
            <li className="text-white">Music</li>
            <li className="text-white">Podcast</li>
            <li className="text-white">Live</li>
            <li className="text-white">Radio</li>

            {/* Search Bar */}
            <li className="flex-grow relative sm:w-auto w-full mt-4 sm:mt-0">
              <div className="flex items-center">
                <input
                  type="text"
                  value="Michael Jackson"
                  className="bg-[#2C0000] p-2 pl-4 rounded-full w-full text-white flex-grow"
                  placeholder="Search"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <img
                    src="/search.png"
                    alt="search"
                    className="h-[22px] sm:h-[24px] w-[22px] sm:w-[24px] object-contain"
                  />
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
