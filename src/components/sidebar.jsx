export default function Sidebar() {
  return (
    <div className=" flex-col flex  h-full pl-12">
      <div className="flex items-center gap-4 mt-8 ">
        <img src="/Group.png" alt="Logo" style={{ height: "3rem" }} />
        <div className="text-2xl font-bold">
          <span style={{ color: "red" }}>Dream</span>
          <span className="text-white " >Music</span>
        </div>
      </div>
      <div className="text-white flex flex-col items-start gap-4 mt-20 flex-grow">
        <div className="text-sm">Menu</div>

        <div className="text-m flex items-center gap-4">
          <img src="/home.png" alt="Logo" />
          <div className="">
            <span>Home</span>
          </div>
        </div>

        <div className="text-m flex items-center gap-4">
          <img src="/trend.png" alt="Logo" />
          <div className="">
            <span>Trends</span>
          </div>
        </div>

        <div className="text-m flex items-center gap-4 ">
          <img src="/music.png" alt="Logo" />
          <div className="">
            <span>Library</span>
          </div>
        </div>

        <div className="text-m flex items-center gap-4">
          <img src="/discover.png" alt="Logo" />
          <div className="">
            <span>Discovery</span>
          </div>
        </div>


        <div className="text-white mt-auto mb-12 mt-8 gap-4 flex flex-col">
        <div className="text-sm">General</div>
        <div className="text-m flex items-center gap-4">
          <img src="/Settings.png" alt="Logo" />
          <div className="">
            <span>Setting</span>
          </div>
        </div>
        <div className="text-m flex items-center gap-4">
          <img src="/Log Out.png" alt="Logo" />
          <div className="">
            <span>Log Out</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
