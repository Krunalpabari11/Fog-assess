import React, { useState, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PlayListContext } from '../context/playListContext';

export default function DragComponent() {
  const songs = [
    { id: "1", img: '/song1.png', title: "Billie Jean", album: "Thriller 25 Super", duration: "4:53", playing: '1,040,811,084' },
    { id: "2", img: '/song1.png', title: "Beat It", album: "Thriller 25 Super", duration: "4:18", playing: '643,786,045' },
    { id: "3", img: '/song3.png', title: "Smooth Criminal", album: "Thriller 25 Super", duration: "4:17", playing: '407,234,004' },
    { id: "4", img: '/song4.png', title: "Don't Stop Til You Get Enough", album: "Bad 25th Anniversary", duration: "6:02", playing: '316,391,952' },
  ];

  const [playlist, setPlaylist] = useState(songs);
  let { currentSong, setCurrentSong, currentIndex, setCurrentIndex } = useContext(PlayListContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedPlaylist = Array.from(playlist);
    const [reorderedItem] = reorderedPlaylist.splice(result.source.index, 1);
    reorderedPlaylist.splice(result.destination.index, 0, reorderedItem);

    setPlaylist(reorderedPlaylist);
  };

  const songHandler = (song) => {
    setCurrentSong(song);
    setCurrentIndex(song.id - 1);
  };

  return (
    <div className="pr-8 pl-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold pl-4">Popular</h2>
        <button className="hover:underline pr-4">See All</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="playlist">
          {(provided) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full"
            >
              {/* For larger screens */}
              <div className=" lg:block">
                {/* Table Header */}
                <div className="grid grid-cols-3 lg:grid-cols-6  text-left font-semibold sticky top-0 text-white py-2 px-4">
                  <div>#</div>
                  <div></div>
                  <div>Title</div>
                  <div className='hidden lg:block' >Playing</div>
                  <div className='hidden lg:block'>Time</div>
                  <div className='hidden lg:block text-right' >Album</div>
                </div>

                {/* Table Body */}
                {playlist.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => songHandler(song)}
                        className={`
                          grid grid-cols-3 lg:grid-cols-6 items-center
                          hover:border-l-4 border-[#CA0000]
                          transition-colors cursor-pointer
                          ${currentSong?.id === song.id ? 'bg-[#520000] border-l-4 border-[#CA0000]' : ''}
                          ${snapshot.isDragging ? 'bg-[#520000] shadow-lg' : 'hover:bg-[#520000]'}
                        `}
                      >
                        <div className="py-2 px-4">
                          {currentSong?.id === song.id ? (
                            <img src="/music.png" className="w-5 h-5" alt="Playing Icon" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="py-2 px-4">
                          <img src={song.img} alt={song.title} className="w-10 h-10 rounded" />
                        </div>
                        <div className="py-2 px-4">{song.title}</div>
                        <div className=" hidden lg:block py-2 px-4">{song.playing}</div>
                        <div className=" hidden lg:block py-2 px-4">{song.duration}</div>
                        <div className=" hidden lg:block py-2 px-4 text-right">{song.album}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
