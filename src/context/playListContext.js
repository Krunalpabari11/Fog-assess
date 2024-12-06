import { createContext,useState } from "react";

export const PlayListContext = createContext();

export const PlayListProvider = ({children}) => {
    const songsList = [
        { id: "1", img: '/song1.png', title: "Billie Jean", album: "Thriller 25 Super", duration: "4:53", playing: '1,040,811,084' },
        { id: "2", img: '/song1.png', title: "Beat It", album: "Thriller 25 Super", duration: "4:18", playing: '643,786,045' },
        { id: "3", img: '/song3.png', title: "Smooth Criminal", album: "Thriller 25 Super", duration: "4:17", playing: '407,234,004' },
        { id: "4", img: '/song4.png', title: "Don't Stop Til You Get Enough", album: "Bad 25th Anniversary", duration: "6:02", playing: '316,391,952' },
      ];

    const [currentSong, setCurrentSong] = useState(null);
    const [currentIndex,setCurrentIndex]=useState(null);

    const states={
        currentSong,
        setCurrentSong,
        songsList,
        currentIndex,
        setCurrentIndex
    }

    return (
        <PlayListContext.Provider value={states}>
            {children}
        </PlayListContext.Provider>
    )
}
