import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <div className="relative w-full">
            {/* Mobile Search Toggle */}
            <div className="sm:hidden absolute top-0 right-0 z-20 p-4">
                <button 
                    onClick={toggleSearch} 
                    className="text-white focus:outline-none"
                >
                    <Search size={24} />
                </button>
            </div>

            {/* Mobile Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-black/80 z-30 sm:hidden">
                    <div className="p-4 mt-20">
                        <div className="relative">
                            <input
                                type="text"
                                value="Michael Jackson"
                                className="bg-[#2C0000] p-3 pl-4 rounded-full w-full text-white"
                                placeholder="Search"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <img
                                    src="/search.png"
                                    alt="search"
                                    className="h-[24px] w-[24px] object-contain"
                                />
                            </div>
                        </div>
                        <button 
                            onClick={toggleSearch} 
                            className="mt-4 w-full bg-red-800 text-white p-3 rounded-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Main Navbar */}
            <div className="pl-8 pt-6 w-full pr-8">
                <nav className="w-full">
                    <ul className="flex flex-col sm:flex-row gap-4 sm:gap-20 items-start sm:items-center">
                        {/* Navigation Items */}
                        <div className="flex flex-row w-full sm:w-auto justify-between items-center gap-16">
                            <li className="text-white">Music</li>
                            <li className="text-white hidden sm:block">Podcast</li>
                            <li className="text-white hidden sm:block">Live</li>
                            <li className="text-white hidden sm:block">Radio</li>
                        </div>

                        {/* Search Bar for Large Screens */}
                        <li className="hidden sm:block flex-grow relative sm:w-auto w-full">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value="Michael Jackson"
                                    className="bg-[#2C0000] p-2 pl-4 rounded-full w-full text-white flex-grow"
                                    placeholder="Search"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <img
                                        src="/search.png"
                                        alt="search"
                                        className="h-[22px] sm:h-[24px] w-[22px] sm:w-[24px] object-contain"
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}