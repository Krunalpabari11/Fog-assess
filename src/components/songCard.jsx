import { useContext, useState, useRef, useEffect } from "react";
import { PlayListContext } from "../context/playListContext";
import { Howl } from "howler";
import '../App.css';

export default function SongCard() {
    const { currentSong, currentIndex, setCurrentSong, songsList, setCurrentIndex } = useContext(PlayListContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const soundRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (currentSong) {
            if (soundRef.current) {
                soundRef.current.unload();
            }

            const sound = new Howl({
                src: [`/songs/${currentSong.title}.mp3`],
                html5: true,
                onplay: () => setIsPlaying(true),
                onpause: () => setIsPlaying(false),
                onend: () => {
                    setIsPlaying(false);
                    soundRef.current = null;
                },
                onload: () => setDuration(sound.duration()),
                onseek: () => setCurrentTime(sound.seek())
            });

            soundRef.current = sound;
            sound.play();
            startTimeUpdate();

        } else {
            setCurrentTime(0);
            setDuration(0);
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
            soundRef.current.pause();
        } else {
            soundRef.current.play();
        }
    };

    const handleSeek = (event) => {
        if (!soundRef.current) return;
        const seekTo = (event.target.value / 100) * duration;
        soundRef.current.seek(seekTo);
    };

    const handleNext = () => {
        if (currentIndex !== null && currentIndex < songsList.length - 1) {
            setCurrentSong(songsList[currentIndex + 1]);
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex !== null && currentIndex > 0) {
            setCurrentSong(songsList[currentIndex - 1]);
            setCurrentIndex(currentIndex - 1);
        }
    };

    const startTimeUpdate = () => {
        intervalRef.current = setInterval(() => {
            if (soundRef.current) {
                setCurrentTime(soundRef.current.seek());
            }
        }, 1000);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            {/* Large Screens - Vertical Layout */}
            <div className="hidden lg:block song-card-wrapper fixed right-0 top-0 bottom-0 w-1/5 bg-gradient-to-b from-[#00000000] to-[#0F0F0F99] overflow-y-auto">
                {currentSong ? (
                    <div className="song-card flex flex-col justify-center items-center mt-auto p-4">
                        <div className="rounded-lg bg-[#6B0000] pt-12 pb-12 w-full p-8 justify-center items-center">
                            <div className="flex justify-center items-center">
                                Now Playing
                            </div>
                            <div className="flex justify-center items-center mt-4">
                                <img
                                    src="./songimage.png"
                                    alt={currentSong.title}
                                    className="rounded-t-lg w-[239px] h-[139px] flex justify-center items-center"
                                />
                            </div>
                            <h4 className="font-bold text-lg flex justify-center items-center">
                                {currentSong.title}
                            </h4>
                            <p className="text-sm text-gray-400 flex justify-center items-center">
                                {currentSong.album}
                            </p>

                            {/* Timeline */}
                            <div className="flex justify-center items-center">
                                <div className="flex justify-center items-center mt-4 w-3/4 gap-6">
                                    <span className="text-sm text-white">{formatTime(currentTime)}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={(currentTime / duration) * 100}
                                        onChange={handleSeek}
                                        className="timeline-slider"
                                    />
                                    <span className="text-sm text-white">{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex justify-center items-center mt-4 gap-6">
                                <button onClick={handlePrevious} className="svg-button" aria-label="Repeat">
                                    <img src="/Repeat.png" alt="Repeat" className="w-5 h-5" />
                                </button>

                                <button onClick={handlePrevious} className="svg-button" aria-label="Previous">
                                    <img src="/Back.png" alt="Previous" className="w-5 h-5" />
                                </button>

                                <button onClick={togglePlayPause} className="svg-button" aria-label={isPlaying ? "Pause" : "Play"}>
                                    {isPlaying ? (
                                        <img src="/Pause.png" alt="Pause" className="w-5 h-5" />
                                    ) : (
                                        <img src="/Play.png" alt="Play" className="w-5 h-5" />
                                    )}
                                </button>

                                <button onClick={handleNext} className="svg-button" aria-label="Next">
                                    <img src="/Next.png" alt="Next" className="w-5 h-5" />
                                </button>

                                <button onClick={handlePrevious} className="svg-button" aria-label="Random">
                                    <img src="/Random.png" alt="Random" className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400 text-center mt-10">Select a song to play</p>
                )}
            </div>

            {/* Mobile Screens - Horizontal Layout at Bottom */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#6B0000] z-50">
                {currentSong ? (
                    <div className="flex items-center p-4 space-x-4">
                        <img
                            src="./songimage.png"
                            alt={currentSong.title}
                            className="rounded-lg w-16 h-16"
                        />
                        <div className="flex-grow">
                            <h4 className="font-bold text-sm">{currentSong.title}</h4>
                            <p className="text-xs text-gray-300">{currentSong.album}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={handlePrevious} className="svg-button" aria-label="Previous">
                                <img src="/Back.png" alt="Previous" className="w-5 h-5" />
                            </button>
                            <button onClick={togglePlayPause} className="svg-button" aria-label={isPlaying ? "Pause" : "Play"}>
                                {isPlaying ? (
                                    <img src="/Pause.png" alt="Pause" className="w-5 h-5" />
                                ) : (
                                    <img src="/Play.png" alt="Play" className="w-5 h-5" />
                                )}
                            </button>
                            <button onClick={handleNext} className="svg-button" aria-label="Next">
                                <img src="/Next.png" alt="Next" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400 text-center p-4">Select a song to play</p>
                )}
            </div>
        </>
    );
}