export default function Sidebar() {
  return (
    <div className="flex flex-col h-full pl-6 sm:pl-12 bg-[#111]">
      {/* Logo Section */}
      <div className="flex items-center gap-4 mt-8 ">
        <img src="/Group.png" alt="Logo" className="h-12 sm:h-16" />
        <div className="text-2xl font-bold">
          <span style={{ color: "red" }}>Dream</span>
          <span className="text-white">Music</span>
        </div>
      </div>

      {/* Menu Section */}
      <div className="text-white flex flex-col items-start gap-4 mt-12 sm:mt-20 flex-grow">
        <div className="text-sm text-gray-400">Menu</div>

        <div className="text-sm sm:text-base flex items-center gap-4">
          <img src="/home.png" alt="Home" className="w-5 sm:w-6" />
          <span>Home</span>
        </div>

        <div className="text-sm sm:text-base flex items-center gap-4">
          <img src="/trend.png" alt="Trends" className="w-5 sm:w-6" />
          <span>Trends</span>
        </div>

        <div className="text-sm sm:text-base flex items-center gap-4">
          <img src="/music.png" alt="Library" className="w-5 sm:w-6" />
          <span>Library</span>
        </div>

        <div className="text-sm sm:text-base flex items-center gap-4">
          <img src="/discover.png" alt="Discovery" className="w-5 sm:w-6" />
          <span>Discovery</span>
        </div>
      </div>

      {/* General Section */}
      <div className="text-white mt-auto mb-12 sm:mb-8 gap-4 flex flex-col">
        <div className="text-sm text-gray-400">General</div>

        <div className="text-sm sm:text-base flex items-center gap-4">
          <img src="/Settings.png" alt="Settings" className="w-5 sm:w-6" />
          <span>Setting</span>
        </div>

        <div className="text-sm sm:text-base flex items-center gap-4">
          <img src="/Log Out.png" alt="Log Out" className="w-5 sm:w-6" />
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
}
