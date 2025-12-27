import { FaTimes, FaShoppingCart, FaTrash } from "react-icons/fa";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeCart, incrementQuantity, decrementQuantity, removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartSidebar() {
    const dispatch = useDispatch();
    const { items: cartItems, isOpen } = useSelector((s) => s.cart);
    const totalQuantity = cartItems.reduce((sum, it) => sum + (it.quantity || 0), 0);
    const totalPrice = cartItems.reduce((sum, it) => sum + (Number(it.price) || 0) * (it.quantity || 0), 0);

    const navigate = useNavigate();

    const handleCheckout = () => {
        dispatch(closeCart());
        navigate('/checkout');
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity z-40 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => dispatch(closeCart())}
            />

            {/* Sidebar */}
            <div
                className={`fixed top-16 right-0 h-[calc(100%-4rem)] w-100 bg-white shadow-2xl transform transition-transform z-50 ${isOpen ? "translate-x-0" : "translate-x-full"} rounded-l-lg flex flex-col`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FaShoppingCart /> Cart
                    </h2>
                    <button onClick={() => dispatch(closeCart())} className="text-gray-600 hover:text-gray-900">
                        <FaTimes />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 border-b pb-2">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.price} MAD</p>
                                </div>

                                {/* Quantity & Remove */}
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => dispatch(decrementQuantity(item.id))}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >-</button>
                                    <span className="font-semibold px-2">{item.quantity}</span>
                                    <button
                                        onClick={() => dispatch(incrementQuantity(item.id))}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >+</button>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="px-2 py-1 text-red-400  rounded "
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-700">Total ({totalQuantity} items)</span>
                        <span className="text-lg font-bold">{totalPrice.toFixed(2)} MAD</span>
                    </div>
                    <button
                        onClick={() => {
                            handleCheckout();
                            navigate("/checkout");
                        }}
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-700 transition"
                    >
                        Checkout
                    </button>

                </div>
            </div>
        </>
    );
}
