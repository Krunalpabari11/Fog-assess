import React, { useState, useRef } from "react";
import { Howl } from "howler";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Sidebar from "./components/sidebar";

const songs = [
  { id: "1", title: "Billie Jean", album: "Thriller 25 Super", duration: "4:53" },
  { id: "2", title: "Beat It", album: "Thriller 25 Super", duration: "4:18" },
  { id: "3", title: "Smooth Criminal", album: "Thriller 25 Super", duration: "4:17" },
  { id: "4", title: "Don’t Stop Til You Get Enough", album: "Bad 25th Anniversary", duration: "6:02" },
  { id: "5", title: "Rock With You", album: "Off The Wall", duration: "5:56" },
];

const App = () => {
  const [playlist, setPlaylist] = useState(songs);
  const [currentSong, setCurrentSong] = useState(null);
  const playerRef = useRef(null);

  const playSong = (song) => {
    if (playerRef.current) {
      playerRef.current.stop();
    }
    const sound = new Howl({
      src: [`/songs/${song.title.replace(/\s+/g, "_")}.mp3`],
      html5: true,
    });
    playerRef.current = sound;
    sound.play();
    setCurrentSong(song);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(playlist);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setPlaylist(reordered);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-[#4C0000] to-[#0A0A0A] text-white font-poppins " style={{overflow:'hidden'}}>
      {/* Sidebar Section */}
      <div className="w-full  lg:w-1/4 bg-black ">
        <Sidebar />
      </div>

      {/* Playlist Section */}
      <div className="flex-1 p-6">
        <h3 className="text-lg font-bold mb-4">Popular Songs</h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="playlist">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {playlist.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center justify-between p-4 rounded-lg bg-gray-800 hover:bg-gray-700 ${
                          currentSong?.id === song.id ? "bg-red-600" : ""
                        }`}
                        onClick={() => playSong(song)}
                      >
                        <span className="flex-1">{song.title}</span>
                        <span className="text-sm text-gray-400">
                          {song.duration}
                        </span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Current Song Section */}
      <div className="w-full lg:w-1/4 p-6 ">
        {currentSong ? (
          <div>
            <h4 className="font-bold text-lg">{currentSong.title}</h4>
            <p className="text-sm text-gray-400">{currentSong.album}</p>
            <p className="text-sm text-gray-400">{currentSong.duration}</p>
            <button
              className="mt-4 bg-red-600 px-4 py-2 rounded"
              onClick={() => playerRef.current.stop()}
            >
              Stop
            </button>
          </div>
        ) : (
          <p className="text-gray-400">Select a song to play</p>
        )}
      </div>
    </div>
  );
};

export default App;
