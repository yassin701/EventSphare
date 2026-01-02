import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/orders`
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
        `${API_URL}/orders/${id}`
      );
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;
  if (!orders.length) return <div className="p-6 text-center">No orders found.</div>;

  return (
    <div className="p-6">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
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
                  {order.items?.length ? (
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

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-6">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold">{index + 1}. {order.fullName}</span>
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(order.id)}
              />
            </div>
            <p className="text-gray-600 text-sm">{order.email}</p>
            <p className="text-gray-600 text-sm">{order.address}</p>
            <p className="text-gray-600 text-sm">{order.phone}</p>
            <p className="font-semibold">{order.total} MAD</p>
            <div>
              {order.items?.length ? (
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
            </div>
            <p className="text-gray-500 text-xs">
              {order.date ? new Date(order.date).toLocaleString() : "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
