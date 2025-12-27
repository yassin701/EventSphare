import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../Components/EventCard";
import DeleteModal from "../../Components/DeleteModal";
import EditModal from "../../Components/EditModal";

export default function AdminEvent() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/event"
      );
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open delete modal
  const handleDeleteModal = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

   const handleEditClick = (event) => {
  setSelectedEvent(event);
  setShowEditModal(true);
};


  // Confirm delete
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/event/${selectedEvent.id}`
      );

      setEvents((prev) =>
        prev.filter((e) => e.id !== selectedEvent.id)
      );
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setShowDeleteModal(false);
      setSelectedEvent(null);
    }
  };

  // Edit (placeholder)
 const confirmEdit = async (updatedEvent) => {
  try {
    await axios.put(
      `https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/event/${updatedEvent.id}`,
      updatedEvent
    );

    setEvents((prev) =>
      prev.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e
      )
    );
  } catch (error) {
    console.error("Edit error:", error);
  } finally {
    setShowEditModal(false);
    setSelectedEvent(null);
  }
};

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Manage Events
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isAdmin={true}
              onDelete={() => handleDeleteModal(event)}
              onEdit={() => handleEditClick(event)}
            />
          ))}
        </div>
      )}

      {/* DELETE MODAL */}
      <DeleteModal
        isOpen={showDeleteModal}
        event={selectedEvent}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      <EditModal 
      isOpen={showEditModal}
      event={selectedEvent}
      onClose={() => setShowEditModal(false)}
      onConfirm={confirmEdit}/>
    </div>
  );
}
