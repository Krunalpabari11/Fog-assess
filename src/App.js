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
    <div 
      className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-[#4C0000] to-[#0A0A0A] text-white font-poppins"
    >
      {/* Sidebar */}
      <div className=" lg:w-1/5">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center overflow-y-auto">
        {/* Navbar */}
        <div className="w-full px-4 py-2">
          <Navbar />
        </div>

        {/* Wallpaper Image */}
        <div className="mt-2 w-full px-4 container mx-auto">
          <img 
            src="wallpaper.png" 
            alt="Wallpaper" 
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        {/* Drag Component */}
        <div className="mt-2 w-full px-4 max-w-6xl">
          <DragComponent />
        </div>
      </div>

      {/* Song Card */}
      <div className="w-full lg:w-1/5 bg-gradient-to-b from-[#00000000] to-[#0F0F0F99]">
        <SongCard />
      </div>
    </div>
  );
};

export default App;
