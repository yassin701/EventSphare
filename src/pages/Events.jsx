import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../Components/EventCard";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", "Music", "Film", "Art", "Sport", "Theatre", "Other"];
    const API_URL = import.meta.env.VITE_APP_API_URL;

    const filteredEvents = events
        .filter(event =>
            selectedCategory === "All" ? true : event.category === selectedCategory
        )
        .filter(event =>
            event.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get(`${API_URL}/event`);
            setEvents(res.data);
        } catch (error) {
            console.error("Error fetching events", error);
        } finally {
            setLoading(false);
        }
    };

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    // Card animation variants
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 20,
            scale: 0.95
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        },
        hover: {
            y: -8,
            scale: 1.03,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 15
            }
        },
        tap: {
            scale: 0.98
        }
    };

    // Loading skeleton animation
    const loadingVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen p-6">
                <h1 className="text-3xl font-bold text-center text-black mb-8 mt-15">
                    Events
                </h1>
                
                {/* Animated Loading Skeleton */}
                <motion.div 
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    variants={loadingVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {[...Array(8)].map((_, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { 
                                    opacity: 1, 
                                    y: 0,
                                    transition: {
                                        duration: 0.3,
                                        delay: index * 0.1
                                    }
                                }
                            }}
                            className="bg-gray-200 rounded-xl p-4 h-80 animate-pulse"
                        >
                            <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen p-6">
                <motion.h1 
                    className="text-3xl font-bold text-center text-black mb-8 mt-15"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Discover Amazing Events
                </motion.h1>

                {/* Search and Filter Section */}
                <motion.div 
                    className='flex flex-col md:flex-row justify-between items-center gap-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {/* Category dropdown */}
                    <motion.select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className='border border-gray-300 rounded-xl px-4 py-3 w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm'
                        whileFocus={{ scale: 1.02 }}
                        whileHover={{ scale: 1.01 }}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </motion.select>

                    {/* Search input */}
                    <motion.div 
                        className="relative w-full md:w-72"
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <motion.input
                            type="text"
                            placeholder='Search events...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='border border-gray-300 rounded-xl pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm'
                            whileFocus={{ scale: 1.02 }}
                        />
                    </motion.div>
                </motion.div>

                {/* Results count */}
                <motion.div 
                    className="mb-6 text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Showing {filteredEvents.length} of {events.length} events
                </motion.div>

                {/* Events Grid with Animation */}
                {filteredEvents.length === 0 ? (
                    <motion.div 
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            className="inline-block mb-4"
                        >
                            <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </motion.div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No events found</h2>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                variants={cardVariants}
                                whileHover="hover"
                                whileTap="tap"
                                custom={index}
                                initial="hidden"
                                animate="visible"
                            >
                                <EventCard
                                    event={event}
                                    isAdmin={false}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Clear filters button */}
                {(searchTerm || selectedCategory !== "All") && (
                    <motion.div 
                        className="text-center mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                            }}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Clear filters
                        </motion.button>
                    </motion.div>
                )}
            </div>
            <Footer />
        </>
    );
}