import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../Components/EventCard";

export default function AdminEvent() {
  const [events, setEvents] = useState([]);
  // 1. Add loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/event");
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      // 2. Stop loading when done
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/event/${id}`);
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleEdit = (event) => {
    console.log("Edit event", event);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-600 mb-6">Manage Events</h1>

      {/* 3. Conditional Rendering */}
      {isLoading ? (
        // --- SIMPLE LOADING SPINNER ---
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-600"></div>
        </div>
      ) : (
        // --- REAL CONTENT ---
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isAdmin={true}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}