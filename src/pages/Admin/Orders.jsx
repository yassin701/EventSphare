import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/orders"
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/orders/${id}`
      );
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;
  if (!orders.length) return <div className="p-6 text-center">No orders found.</div>;

  return (
    <div className="p-6 overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Address</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Total</th>
            <th className="py-3 px-4 text-left">Items</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{order.fullName}</td>
              <td className="py-3 px-4">{order.email}</td>
              <td className="py-3 px-4">{order.address}</td>
              <td className="py-3 px-4">{order.phone}</td>
              <td className="py-3 px-4 font-semibold">{order.total} MAD</td>

              <td className="py-3 px-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <span className="text-sm">
                        {item.name} ({item.quantity})
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No items</span>
                )}
              </td>

              <td className="py-3 px-4 text-sm text-gray-500">
                {order.date ? new Date(order.date).toLocaleString() : "-"}
              </td>

              <td className="py-3 px-4">
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(order.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
