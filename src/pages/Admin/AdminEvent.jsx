import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../Components/EventCard";

export default function AdminEvent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get("https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/event");
    setEvents(res.data);
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
    </div>
  );
}
