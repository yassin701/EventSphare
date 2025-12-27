import { FaEdit, FaTrash, FaShoppingCart, FaCalendarAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
export default function DarkEventCard({ event, isAdmin = false, onEdit, onDelete, onAddToCart }) {
  const dispatch = useDispatch();
  return (
    // Reduced rounded-2xl to rounded-xl for a tighter look
    <div className="group relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800
     hover:border-purple-500/50 transition-all duration-300 shadow-lg h-full max-w-sm mx-auto">
      
      {/* Image Container */}
      {/* Changed to aspect-[4/5] or aspect-square to keep it vertically compact */}
      <div className="aspect-4/5 relative overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 
          opacity-80 group-hover:opacity-100"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-900/20 to-gray-900" />
        {/* Category Badge */}  
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">
          {event.category}
        </div>
      </div>


      {/* Content Container - Reduced padding (p-5 -> p-3) */}
      <div className="absolute bottom-0 left-0 right-0 p-3 pt-8 bg-linear-to-t from-gray-900 via-gray-900/95 to-transparent">
        <div className="flex items-center gap-1.5 text-purple-400 text-[10px] font-bold mb-1 uppercase tracking-wider">
            <FaCalendarAlt size={10} /> {event.date}
        </div>
        
        
        {/* Title - Reduced text-xl to text-base */}
        <h3 className="text-white text-base font-bold mb-1 truncate leading-tight">
            {event.name}
        </h3>
        <p className="text-gray-400 text-xs line-clamp-2 mb-3 leading-relaxed">
            {event.description}
        </p>
        <div className="flex items-center justify-between border-t border-gray-700 pt-3">
          <div className="text-white font-bold text-base">
            {event.price} <span className="text-gray-500 text-[10px] uppercase">MAD</span>
          </div>

          {!isAdmin ? (
           <button 
                onClick={() => {
                  const item = { ...event, quantity: 1 };
                  if (onAddToCart) onAddToCart(item);
                  else dispatch(addToCart(item));
                }}
                className="bg-white text-gray-900 hover:bg-purple-500 hover:text-white px-3 py-1.5 rounded-lg 
                font-bold text-xs transition-all shadow-md flex items-center gap-1"
            >
                <FaShoppingCart size={10} /> Add
            </button>

          ) : (

            <div className="flex gap-1.5">
               <button onClick={() => onEdit && onEdit(event)} className="bg-gray-800 p-1.5 rounded-md
                text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-colors">
                    <FaEdit size={12} />
               </button>

               <button onClick={() => onDelete && onDelete(event.id)} className="bg-gray-800 p-1.5 rounded-md
                text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors">
                    <FaTrash size={12} />
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}