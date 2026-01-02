import React, { useState, useEffect , } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const orderData = {
      fullName: form.fullName.value,
      email: form.email.value,
      address: form.address.value,
      phone: form.phone.value,
      paymentMethod: form.payment.value,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
      date: new Date().toISOString(),
    };

    /* Send FULL order to MockAPI */
    try {
      await axios.post(`${API_URL}/orders`, orderData);
    } catch (err) {
      console.warn("MockAPI failed:", err);
    }

    /* Send to n8n */
    try {
      await axios.post(import.meta.env.VITE_N8N_WEBHOOK_URL, orderData);
    } catch (err) {
      console.error("n8n error:", err);
    }

    setShowModal(true);
  };

  // Automatically clear cart and hide modal after 3s
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        dispatch(clearCart());
        setShowModal(false);
        navigate("/events");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showModal, dispatch]);

  if (items.length === 0 && !showModal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ORDER SUMMARY */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-center mb-6">Order Summary</h2>

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 mb-4 p-3 bg-white rounded-xl shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.price} MAD × {item.quantity}
                </p>
              </div>
              <p className="font-bold">{item.price * item.quantity} MAD</p>
            </div>
          ))}

          <div className="flex justify-between mt-6 pt-4 border-t text-lg font-bold">
            <span>Total</span>
            <span>{totalPrice} MAD</span>
          </div>
        </div>

        {/* CHECKOUT FORM */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="fullName"
              required
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Full Name"
            />
            <input
              name="email"
              type="email"
              required
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Email"
            />
            <input
              name="address"
              required
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Address"
            />
            <input
              name="phone"
              required
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Phone"
            />

            <select
              name="payment"
              className="w-full border px-4 py-2 rounded-lg"
            >
              <option>Cash on Delivery</option>
              <option>Credit Card</option>
              <option>PayPal</option>
            </select>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-700"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>

      {/* SUCCESS ANIMATION */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col items-center animate-scale-in">

            {/* Check Animation */}
            <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center animate-success">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="mt-6 text-xl font-bold text-green-600">
              Order Successful
            </h2>

            <p className="text-gray-500 mt-2 text-center">
              Your order has been placed successfully 🎉
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
