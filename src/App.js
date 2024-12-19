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


  return (
    <div className="flex h-screen bg-gradient-to-b from-[#4C0000] to-[#0A0A0A] text-white font-poppins overflow-hidden">
      {/* Sidebar - Fixed */}
      <div className=" lg:block w-1/5 h-screen">
        <Sidebar />
      </div>

      {/* Main Content - Scrollable */}
      <div className=" flex flex-col h-screen">
        {/* Fixed Navbar */}
        <div className="w-full px-4 py-2">
          <Navbar />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar" style={{scrollbarWidth:'none'}}>
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
              <DragComponent 
              
              />
            </div>
          </div>
        </div>
      </div>

      {/* Song Card - Fixed */}
        <div className="h-full w-1/5 bg-gradient-to-b from-[#00000000] to-[#0F0F0F99]">
          <SongCard  />
        </div>

     
     
    </div>
  );
};

export default App;