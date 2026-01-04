import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTicketAlt, FaCalendarAlt, FaMusic, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

export default function Hero3D() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-black to-gray-800 px-6 pt-24 pb-12">
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px),
                            linear-gradient(to bottom, #333 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{ 
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              opacity: 0.3
            }}
            animate={{
              y: [null, '-20px', '0px'],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* LEFT CONTENT - Modern Minimalist */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left space-y-8"
        >


          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Experience</span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Live Moments
              </motion.span>
            </h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-1 w-24 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"
            ></motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-gray-400 text-lg max-w-xl leading-relaxed"
          >
            From intimate concerts to massive festivals. Secure your spot with instant 
            booking and NFT-backed digital tickets for unforgettable experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button 
              onClick={() => navigate("/events")}
              className="group relative px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <span>Browse Events</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={() => navigate("/about")}
              className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              Learn More
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
          >
            {[
              { icon: FaTicketAlt, value: "50K+", label: "Tickets Sold", color: "text-blue-400" },
              { icon: FaMusic, value: "300+", label: "Live Events", color: "text-purple-400" },
              { icon: FaMapMarkerAlt, value: "40+", label: "Cities", color: "text-pink-400" }
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className={`text-2xl ${stat.color}`}>
                  <stat.icon className="inline-block mb-1" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT - 3D Ticket Stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-125 flex items-center justify-center"
        >
          {/* Ticket Stack */}
          <div className="relative w-full max-w-md h-full">
            {/* Back Ticket */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
              className="absolute w-80 h-48 bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 left-4 top-12 transform rotate-6"
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="text-gray-400 text-sm">JAZZ NIGHT</div>
                  <div className="text-white text-lg font-bold mt-1">Smooth Classics</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-300 font-medium">15 DEC</div>
                  <div className="text-green-400 font-bold">85 MAD</div>
                </div>
              </div>
            </motion.div>

            {/* Middle Ticket */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1
              }}
              className="absolute w-80 h-48 bg-linear-to-br from-gray-700 to-gray-800 rounded-2xl shadow-2xl border border-gray-600/50 left-8 top-6 transform -rotate-3"
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="text-gray-300 text-sm">THEATER</div>
                  <div className="text-white text-lg font-bold mt-1">Modern Drama</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-300 font-medium">22 NOV</div>
                  <div className="text-green-400 font-bold">95 MAD</div>
                </div>
              </div>
            </motion.div>

            {/* Main 3D Ticket */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 15, 0, -15, 0],
                rotateX: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-80 h-48 bg-linear-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform perspective-1000 border border-white/10"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl"></div>
              
              {/* Ticket perforation */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-20 bg-gray-900 rounded-full flex flex-col items-center justify-between py-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-gray-600 rounded-full"></div>
                ))}
              </div>

              <div className="relative h-full flex flex-col justify-between">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                      >
                        <FaMusic className="text-white" />
                      </motion.div>
                      <div>
                        <div className="text-blue-300 text-sm font-medium uppercase tracking-wider">PREMIUM</div>
                        <div className="text-white text-2xl font-bold">FESTIVAL 2025</div>
                      </div>
                    </div>
                    <div className="text-white/50 text-sm">
                      <FaCalendarAlt className="inline mr-1" />
                      VIP
                    </div>
                  </div>
                  
                  <div className="mt-4 text-gray-300">
                    Ultimate music experience with exclusive backstage access
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <div className="text-gray-400 text-sm">DATE & TIME</div>
                    <div className="text-white font-bold">12 OCT • 20:00</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">PRICE</div>
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-2xl font-bold bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                    >
                      120 MAD
                    </motion.div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <FaTicketAlt className="text-white" />
                  </div>
                </div>
              </div>

              {/* 3D edge effect */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-32 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-r-lg"></div>
            </motion.div>
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-4 right-4 w-16 h-16 rounded-full border-2 border-blue-500/30"
          ></motion.div>
          
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-4 left-4 w-8 h-8 rounded-full border border-purple-500/30"
          ></motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500 text-sm mb-2 flex items-center gap-2"
        >
          <span>Scroll</span>
          <div className="w-12 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}