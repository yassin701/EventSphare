import { useEffect, useState } from "react";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, ordersRes] = await Promise.all([
          fetch("https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/event"),
          fetch("https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/orders"),
        ]);

        const eventsData = eventsRes.ok ? await eventsRes.json() : [];
        const ordersData = ordersRes.ok ? await ordersRes.json() : [];

        setEvents(Array.isArray(eventsData) ? eventsData : []);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        setEvents([]);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading dashboard...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-500 mb-8">
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border p-6 hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-2">Total Events</p>
          <p className="text-4xl font-bold text-blue-600">{events.length}</p>
        </div>

        <div className="bg-white rounded-2xl border p-6 hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-2">Total Orders</p>
          <p className="text-4xl font-bold text-green-600">{orders.length}</p>
        </div>
      </div>
    </div>
  );
}
