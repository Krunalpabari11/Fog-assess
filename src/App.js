import React, { useState } from "react";
import { Howl } from "howler";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import SongCard from "./components/songCard";
import DragComponent from "./components/dragcomponent";

const songs = [
  { id: "1", title: "Billie Jean", album: "Thriller 25 Super", duration: "4:53", file: "Billie_Jean.mp3" },
  { id: "2", title: "Beat It", album: "Thriller 25 Super", duration: "4:18", file: "Beat_It.mp3" },
  { id: "3", title: "Smooth Criminal", album: "Thriller 25 Super", duration: "4:17", file: "Smooth_Criminal.mp3" },
  { id: "4", title: "Don't Stop Til You Get Enough", album: "Bad 25th Anniversary", duration: "6:02", file: "Dont_Stop_Til_You_Get_Enough.mp3" },
  { id: "5", title: "Rock With You", album: "Off The Wall", duration: "5:56", file: "Rock_With_You.mp3" },
];

const App = () => {
  const [playlist, setPlaylist] = useState(songs);
  const [currentSong, setCurrentSong] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(playlist);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setPlaylist(reordered);
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#4C0000] to-[#0A0A0A] text-white font-poppins overflow-hidden">
      
      <div className=" lg:block lg:w-1/5 w-1/10 h-screen">
        <Sidebar />
      </div>

      
      <div className="flex-1 flex flex-col h-screen">
        {/* Fixed Navbar */}
        <div className="w-full px-4 py-2">
          <Navbar />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto " style={{scrollbarWidth:'none'}} >
          {/* Container for scrollable content */}
          <div className="px-4 space-y-4">
            {/* Wallpaper Image */}
            <div className="container mx-auto">
              <img
                src="wallpaper.png"
                alt="Wallpaper"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>

            {/* Drag Component */}
            <div className="max-w-6xl mx-auto pb-20 lg:pb-0">
              <DragComponent />
            </div>
          </div>
        </div>
      </div>

      {/* Song Card - Fixed */}
      <div className="hidden lg:block w-1/5 h-screen">
        <div className="h-full bg-gradient-to-b from-[#00000000] to-[#0F0F0F99]">
          <SongCard />
        </div>
      </div>

      {/* Mobile Song Card */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0">
        <SongCard />
      </div>
    </div>
  );
};

export default App;