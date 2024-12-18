import { useContext, useState, useRef, useEffect } from "react";
import { PlayListContext } from "../context/playListContext";
import { Howl } from "howler";
import "../App.css";

export default function SongCard() {
    const { currentSong, currentIndex, setCurrentSong, songsList, setCurrentIndex } = useContext(PlayListContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const soundRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (currentSong) {
            // Unload any previously loaded sound
            if (soundRef.current) {
                soundRef.current.unload();
            }

            const sound = new Howl({
                src: [`/songs/${currentSong.title}.mp3`],
                html5: true,
                onplay: () => setIsPlaying(true),
                onpause: () => setIsPlaying(false),
                onend: handleNext, // Automatically play the next song
                onload: () => {
                    setDuration(sound.duration());
                    startTimeUpdate(); // Start updating time when the song is loaded
                },
                onseek: () => setCurrentTime(sound.seek()),
            });

            soundRef.current = sound;
            sound.play(); // Play the song when loaded

        } else {
            // Reset state when no song is playing
            setCurrentTime(0);
            setDuration(0);
            setIsPlaying(false);
        }

        return () => {
            if (soundRef.current) {
                soundRef.current.unload();
            }
            clearInterval(intervalRef.current);
        };
    }, [currentSong]);

    const togglePlayPause = () => {
        if (!soundRef.current) return;

        if (isPlaying) {
            soundRef.current.pause(); // Pause playback
        } else {
            soundRef.current.play(); // Resume playback
        }

        setIsPlaying(!isPlaying); // Toggle the playing state
    };

    const handleSeek = (event) => {
        if (!soundRef.current) return;
        const seekTo = (event.target.value / 100) * duration;
        soundRef.current.seek(seekTo);
        setCurrentTime(seekTo);
    };

    const handleNext = () => {
        if (currentIndex !== null && currentIndex < songsList.length - 1) {
            setCurrentSong(songsList[currentIndex + 1]);
            setCurrentIndex(currentIndex + 1);
        } else {
            // Reset if the playlist ends
            setCurrentSong(null);
            setCurrentIndex(null);
        }
    };

    const handlePrevious = () => {
        if (currentIndex !== null && currentIndex > 0) {
            setCurrentSong(songsList[currentIndex - 1]);
            setCurrentIndex(currentIndex - 1);
        }
    };

    const startTimeUpdate = () => {
        clearInterval(intervalRef.current); // Clear existing intervals
        intervalRef.current = setInterval(() => {
            if (soundRef.current) {
                setCurrentTime(soundRef.current.seek());
            }
        }, 1000);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <>
            {/* Desktop Version */}
            <div className="hidden lg:block lg:fixed lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/5">
                <div className="h-full bg-gradient-to-b from-[#00000000] to-[#0F0F0F99]">
                    {currentSong ? (
                        <div className="song-card flex flex-col justify-end h-full p-4">
                            <div className="rounded-lg bg-[#6B0000] pt-12 pb-12 w-full p-8">
                                <div className="flex justify-center items-center">
                                    Now Playing
                                </div>
                                <div className="flex justify-center items-center mt-4">
                                    <img
                                        src="./songimage.png"
                                        alt={currentSong.title}
                                        className="rounded-t-lg w-[239px] h-[139px]"
                                    />
                                </div>
                                <h4 className="font-bold text-lg text-center mt-4">
                                    {currentSong.title}
                                </h4>
                                <p className="text-sm text-gray-400 text-center">
                                    {currentSong.album}
                                </p>
                                {/* Timeline */}
                                <div className="mt-4">
                                    <div className="flex items-center justify-center gap-6">
                                        <span className="text-sm text-white">{formatTime(currentTime)}</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={(currentTime / duration) * 100}
                                            onChange={handleSeek}
                                            className="timeline-slider flex-grow"
                                        />
                                        <span className="text-sm text-white">{formatTime(duration)}</span>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex justify-center items-center mt-4 gap-6">
                                    <button onClick={handlePrevious} className="svg-button">
                                        <img src="/Repeat.png" alt="Repeat" className="w-5 h-5" />
                                    </button>
                                    <button onClick={handlePrevious} className="svg-button">
                                        <img src="/Back.png" alt="Previous" className="w-5 h-5" />
                                    </button>
                                    <button onClick={togglePlayPause} className="svg-button">
                                        <img 
                                            src={isPlaying ? "/Pause.png" : "/Play.png"} 
                                            alt={isPlaying ? "Pause" : "Play"} 
                                            className="w-5 h-5" 
                                        />
                                    </button>
                                    <button onClick={handleNext} className="svg-button">
                                        <img src="/Next.png" alt="Next" className="w-5 h-5" />
                                    </button>
                                    <button onClick={handlePrevious} className="svg-button">
                                        <img src="/Random.png" alt="Random" className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-end pb-4">
                            <p className="text-gray-400 text-center w-full">Select a song to play</p>
                        </div>
                    )}
                </div>
            </div>

            
            <div className=" lg:hidden fixed bottom-0 left-0 right-0 bg-[#6B0000] z-50">
                {currentSong ? (
                    <div className="flex items-center p-4 space-x-4">
                        <img
                            src="./songimage.png"
                            alt={currentSong.title}
                            className="rounded-lg w-12 h-12"
                        />
                        <div className="flex-grow min-w-0">
                            <h4 className="font-bold text-sm truncate">{currentSong.title}</h4>
                            <p className="text-xs text-gray-300 truncate">{currentSong.album}</p>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                        <div className="flex justify-center items-center mt-4 gap-6">
                                    <button onClick={handlePrevious} className="svg-button">
                                        <img src="/Repeat.png" alt="Repeat" className="w-5 h-5" />
                                    </button>
                                    <button onClick={handlePrevious} className="svg-button">
                                        <img src="/Back.png" alt="Previous" className="w-5 h-5" />
                                    </button>
                                    <button onClick={togglePlayPause} className="svg-button">
                                        <img 
                                            src={isPlaying ? "/Pause.png" : "/Play.png"} 
                                            alt={isPlaying ? "Pause" : "Play"} 
                                            className="w-5 h-5" 
                                        />
                                    </button>
                                    <button onClick={handleNext} className="svg-button">
                                        <img src="/Next.png" alt="Next" className="w-5 h-5" />
                                    </button>
                                    <button onClick={handlePrevious} className="svg-button">
                                        <img src="/Random.png" alt="Random" className="w-4 h-4" />
                                    </button>
                                </div>
                                
                        </div>
                    </div>
                ) : (

                    <p className="text-gray-400 text-center p-4">Select a song to play</p>
                )}
            </div>
        </>
    );
}
