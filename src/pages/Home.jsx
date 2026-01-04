import { useEffect, useState } from "react";
import axios from "axios";
import Hero3D from "../Components/Hero3D";
import EventCard from "../Components/EventCard";
import Footer from "../Components/Footer";
import { FaSearch, FaTicketAlt, FaCreditCard, FaQrcode, FaCalendarAlt, FaUsers, FaMusic, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_URL}/event`);
        const allEvents = res.data || [];
        setEvents(allEvents);
        
        // Get featured events (you might want to add a 'featured' flag to your API)
        const featured = allEvents
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setFeaturedEvents(featured);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Hero3D />

      {/* UPCOMING EVENTS PREVIEW */}
      <section className="py-24 px-6 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Upcoming <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Highlights</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Mark your calendar for these can't-miss events
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {events
                .filter(event => new Date(event.date) > new Date())
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 4)
                .map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={() => window.location.href = "/events"}
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Explore All Events
              </button>
              <button
                onClick={() => window.location.href = "/events?filter=upcoming"}
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-800 font-semibold rounded-xl hover:border-blue-400 transition-all duration-300"
              >
                View Upcoming
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 relative overflow-hidden bg-linear-to-br from-gray-900 to-black text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                                linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Your Ticket <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From discovery to unforgettable memories - it's seamless with EventSphere
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: FaSearch,
                title: "Discover Events",
                description: "Browse through thousands of concerts, festivals, and exclusive shows curated just for you",
                color: "from-blue-500 to-cyan-500",
                features: ["Personalized recommendations", "Advanced filters", "Real-time updates"]
              },
              {
                icon: FaCreditCard,
                title: "Secure Booking",
                description: "Safe and instant checkout with multiple payment options and transparent pricing",
                color: "from-purple-500 to-pink-500",
                features: ["Encrypted payments", "Instant confirmation", "Flexible refunds"]
              },
              {
                icon: FaQrcode,
                title: "Digital Access",
                description: "Get instant digital tickets with QR codes and exclusive digital collectibles",
                color: "from-green-500 to-emerald-500",
                features: ["Mobile entry", "NFT tickets", "Easy transfers"]
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Connection line for desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-linear-to-r from-blue-500/50 to-purple-500/50 z-0"></div>
                )}

                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 h-full transition-all duration-300 group-hover:bg-gray-800/70 group-hover:border-blue-500/30">
                  {/* Step number */}
                  <div className="absolute -top-4 left-8">
                    <div className={`w-10 h-10 rounded-full bg-linear-to-r ${step.color} flex items-center justify-center font-bold text-white`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-linear-to-r ${step.color} flex items-center justify-center mb-6`}>
                    <step.icon className="text-white text-2xl" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 mb-6">{step.description}</p>

                  {/* Features list */}
                  <ul className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 pt-12 border-t border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: FaUsers, value: "50K+", label: "Happy Customers", color: "text-blue-400" },
              { icon: FaTicketAlt, value: "300+", label: "Events Monthly", color: "text-purple-400" },
              { icon: FaMusic, value: "40+", label: "Cities", color: "text-pink-400" },
              { icon: FaStar, value: "4.9", label: "Rating", color: "text-yellow-400" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl mb-2 ${stat.color}`}>
                  <stat.icon className="inline-block mb-1" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      

      <Footer />
    </>
  );
}