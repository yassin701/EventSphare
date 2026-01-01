import { useEffect, useState } from "react";
import axios from "axios";
import Hero3D from "../Components/Hero3D";
import EventCard from "../Components/EventCard";
import Footer from "../Components/Footer";
export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://694d36b2ad0f8c8e6e200cec.mockapi.io/api/v1/event"
        );
        setEvents(res.data || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const randomEvents = events
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <>
      <Hero3D />

      {/* EVENTS */}
      <section className="py-20 px-6 max-w-8xl mx-auto ">
        <h2 className="text-3xl font-bold text-center text-black mb-4">
          Featured Events
        </h2>

        <p className="text-center text-black max-w-2xl mx-auto mb-10">
          Discover upcoming events selected for you.
        </p>

        {loading ? (
          <p className="text-center text-white">Loading events...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {randomEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
{/* FEATURE STEPS */}
<section className="py-24 relative overflow-hidden bg-white text-black mb-20">
  {/* subtle animated shapes in background */}
  <div className="absolute inset-0 -z-10 opacity-20">
    <div className="w-72 h-72 bg-purple-300 rounded-full blur-3xl animate-pulse absolute top-0 left-1/4"></div>
    <div className="w-96 h-96 bg-blue-300 rounded-full blur-2xl animate-pulse absolute bottom-0 right-1/3"></div>
  </div>

  <h2 className="text-4xl font-bold text-center mb-12">Your Ticket Journey</h2>

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
    {[
      { title: "Explore Events", desc:  "Browse concerts, festivals & live shows" , icon: "🎵" },
      { title: "Book Securely", desc: "Fast checkout with multiple payment options", icon: "💳" },
      { title: "Get Instant Access", desc: "Receive your digital ticket immediately", icon: "🎟️" },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-white/50 backdrop-blur-md border border-gray-200 p-8 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-500 flex flex-col items-center text-center"
      >
        <div className="text-5xl mb-4 animate-bounce">{item.icon}</div>
        <h3 className="font-bold text-xl mb-2">{item.title}</h3>
        <p className="text-gray-800">{item.desc}</p>
      </div>
    ))}
  </div>
</section>

    <Footer />
    </>
  );
}
