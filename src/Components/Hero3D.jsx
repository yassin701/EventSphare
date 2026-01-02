import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function Hero3D() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-400 via-white to-indigo-300
 text-white px-6">
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Book Your <span className="text-black">Event Ticket</span>
          </h1>

          <p className="mt-6 text-black max-w-md">
            Discover concerts, festivals, and exclusive events.
            Book tickets instantly with a smooth experience.
          </p>

          <button onClick={()=> navigate("/events")} className="mt-8 px-8 py-4 bg-gray-300 text-black rounded-xl font-semibold hover:scale-105 transition">
            Explore Events
          </button>
        </motion.div>

        {/* RIGHT TICKET 3D */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex justify-center"
        >
          <div className="relative w-72 h-44 bg-white text-black rounded-2xl shadow-2xl p-6 transform perspective-1000 rotate-[-8deg]">
            
            {/* Ticket cut circles */}
           
            <h3 className="font-bold text-xl">Live Concert</h3>
            <p className="text-sm text-gray-600 mt-1">VIP Access</p>

            <div className="mt-6 flex justify-between items-center">
              <span className="font-semibold">12 OCT 2025</span>
              <span className="font-bold text-green-500">120 MAD</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
