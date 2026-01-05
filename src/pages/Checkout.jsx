import React, { useState, useEffect } from "react";
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
      items,
      total: totalPrice,
      date: new Date().toISOString(),
    };

    try {
      await axios.post(`${API_URL}/orders`, orderData);
      await axios.post(import.meta.env.VITE_N8N_WEBHOOK_URL, orderData);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        dispatch(clearCart());
        navigate("/events");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showModal, dispatch, navigate]);

  if (items.length === 0 && !showModal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-black text-white px-4">
        <h2 className="text-xl font-semibold text-center">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-black p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-6 text-white">

        {/* ORDER SUMMARY */}
        <div className="p-4 sm:p-6 bg-white/5 rounded-3xl overflow-y-auto max-h-[80vh]">
          <h2 className="text-2xl font-bold text-center mb-4 sm:mb-6">Order Summary</h2>

          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 p-3 bg-white/10 rounded-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-300">
                  {item.price} MAD × {item.quantity}
                </p>
              </div>

              <p className="font-bold mt-2 sm:mt-0">
                {item.price * item.quantity} MAD
              </p>
            </div>
          ))}

          <div className="flex justify-between mt-4 sm:mt-6 pt-4 border-t border-white/20 text-lg font-bold">
            <span>Total</span>
            <span>{totalPrice} MAD</span>
          </div>
        </div>

        {/* CHECKOUT FORM */}
        <div className="p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-center mb-4 sm:mb-6">Checkout</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {["fullName", "email", "address", "phone"].map((field) => (
              <input
                key={field}
                name={field}
                required
                type={field === "email" ? "email" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
            ))}

            <select
              name="payment"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-purple-400 transition"
            >
              <option className="text-black">Cash on Delivery</option>
              <option className="text-black">Credit Card</option>
              <option className="text-black">PayPal</option>
            </select>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-gray-700 hover:opacity-90 transition shadow-lg"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-10 rounded-3xl shadow-2xl flex flex-col items-center text-white max-w-sm w-full">
            <div className="w-20 h-20 rounded-full border-4 border-purple-400 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="mt-4 sm:mt-6 text-xl font-bold text-center">Order Successful</h2>
            <p className="text-gray-300 mt-2 text-center text-sm sm:text-base">
              Your order has been placed successfully 🎉
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
