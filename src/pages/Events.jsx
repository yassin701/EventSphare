import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../Components/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-green-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-8 mt-25">
       Events
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
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
