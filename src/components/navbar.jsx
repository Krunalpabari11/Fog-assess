export default function Navbar() {
    return (
      <>
        <div className="pl-28 pt-6 md:flex w-full">
          <nav>
            <ul className="flex flex-cols gap-20 items-center">
              <li>Music</li>
              <li>Podcast</li>
              <li>Live</li>
              <li>Radio</li>
              <li className="flex-grow relative">
                <div className="flex items-center">
                  <input
                    type="text"
                    value="Michael Jackson"
                    className="bg-[#2C0000] p-2 pl-4 rounded-full w-full text-white flex-grow"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <img src="/search.png" alt="search" className="h-[22px]" />
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }