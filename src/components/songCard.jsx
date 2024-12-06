import { useContext, useState, useRef, useEffect } from "react";
import { PlayListContext } from "../context/playListContext";
import { Howl } from "howler";
import '../App.css';

export default function SongCard() {
    const { currentSong, currentIndex, setCurrentSong, songsList,setCurrentIndex } = useContext(PlayListContext);
        const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0); // For tracking current time
    const [duration, setDuration] = useState(0); // For song duration
    const soundRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
       console.log(currentIndex+"currentINdex")
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
                onload: () => setDuration(sound.duration()), // Set song duration when loaded
                onseek: () => setCurrentTime(sound.seek()) // Update current time while playing
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
            clearInterval(intervalRef.current); // Clear time update interval on unmount
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
            console.log(songsList[currentIndex])
            setCurrentSong(songsList[currentIndex + 1]); // Move to the next song
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex !== null && currentIndex > 0) {
            setCurrentSong(songsList[currentIndex - 1]); // Move to the previous song
            setCurrentIndex(currentIndex - 1);
        }
    };

    const startTimeUpdate = () => {
        intervalRef.current = setInterval(() => {
            if (soundRef.current) {
                setCurrentTime(soundRef.current.seek());
            }
        }, 1000); // Update current time every second
    };

    return (
        <>
<div className="song-card-wrapper flex flex-col justify-end items-end">
    {currentSong ? (
        <div className="song-card flex flex-col justify-center items-center mt-auto">
            <div className="rounded-lg bg-[#6B0000] pt-12 pb-12 w-auto p-8 justify-center items-center">
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
                        <span className="text-sm text-white">{Math.floor(currentTime)}s</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={(currentTime / duration) * 100}
                            onChange={handleSeek}
                            className="timeline-slider"
                        />
                        <span className="text-sm text-white">{Math.floor(duration)}s</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center mt-4 gap-6">
                    <button onClick={handlePrevious} className="svg-button" aria-label="Previous">
                        <img src="/Repeat.png" alt="Previous" className="w-5 h-5" />
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

                    <button onClick={handlePrevious} className="svg-button" aria-label="Previous">
                        <img src="/Random.png" alt="Previous" className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <p className="text-gray-400">Select a song to play</p>
    )}
</div>

        </>
    );
}
