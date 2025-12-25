import { FaEdit, FaTrash, FaShoppingCart, FaCalendarAlt } from "react-icons/fa";

export default function DarkEventCard({ event, isAdmin = false, onEdit, onDelete, onAddToCart }) {
  return (
    <div className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-xl">
      
      {/* Image with Gradient Overlay */}
      <div className="aspect-4/3 relative overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-900/60 to-gray-900" />
        
        <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg shadow-purple-900/50">
          {event.category}
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-1 uppercase tracking-wider">
            <FaCalendarAlt /> {event.date}
        </div>
        
        <h3 className="text-white text-xl font-bold mb-2 truncate">{event.name}</h3>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-white font-bold text-lg">
            {event.price} <span className="text-gray-400 text-sm">MAD</span>
          </div>

          {!isAdmin ? (
            <button 
                onClick={() => onAddToCart && onAddToCart(event)}
                className="bg-white text-gray-900 hover:bg-purple-500 hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-all"
            >
                Add to Cart
            </button>
          ) : (
            <div className="flex gap-2">
               <button onClick={() => onEdit(event)} className="text-gray-400 hover:text-blue-400 p-1"><FaEdit size={18} /></button>
               <button onClick={() => onDelete(event.id)} className="text-gray-400 hover:text-red-400 p-1"><FaTrash size={18} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}