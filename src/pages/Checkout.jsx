import React from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
  const { items } = useSelector((state) => state.cart);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <h2 className="text-xl font-semibold text-center">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 p-4">
      
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ORDER SUMMARY */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-center mb-6">Order Summary</h2>

          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 p-3 bg-white rounded-xl shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 sm:w-16 sm:h-16 object-cover rounded-lg"
              />

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.price} MAD × {item.quantity}
                </p>
              </div>

              <p className="font-bold mt-2 sm:mt-0">{item.price * item.quantity} MAD</p>
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

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <input
              type="text"
              placeholder="Shipping Address"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <select className="w-full border rounded-lg px-4 py-2">
              <option>Cash on Delivery</option>
              <option>Credit Card</option>
              <option>PayPal</option>
            </select>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
              onSubmit={ ()=> dispatch(clearCart())

              }
            >
              Place Order
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
