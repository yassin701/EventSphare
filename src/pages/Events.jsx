import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../Components/EventCard";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", "Music","Film", "Art", "Sport", "Theatre", "Other"];


    const filteredProducts = events
        .filter(product =>
            selectedCategory === "All" ? true : product.category === selectedCategory
        )
        .filter(event =>
            event.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get(
                "https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/event"
            );
            setEvents(res.data);
        } catch (error) {
            console.error("Error fetching events", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loading events...
            </div>
        );
    }

    return (
        <div className=" min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center text-black mb-8 mt-15">
                Events
            </h1>

            {/* Category + Search */}
            <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-8'>
                {/* Category dropdown */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='border rounded-lg px-4 py-2 w-full md:w-60'
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Search input */}
                <input
                    type="text"
                    placeholder='Search product...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='border rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none'
                />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        isAdmin={false}   // 👈 user mode
                    />
                ))}
            </div>
        </div>
    );
}
