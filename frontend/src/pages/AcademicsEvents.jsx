import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AcademicsEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // YOUR SCRIPT URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-_TLEQ-trht5jI2klTi4GJCL-cYJtbVfRfjkNjqlPTJzd43UXqfSemFGpDKGjsNyKbQ/exec";

  useEffect(() => {
    const fetchEvents = async () => {
      // 1. Check Session Storage FIRST for instant load
      const cachedData = sessionStorage.getItem("events_data");
      if (cachedData) {
        setEvents(JSON.parse(cachedData));
        setLoading(false); 
      }

      try {
        // 2. Fetch fresh data in background
        const response = await fetch(GOOGLE_SCRIPT_URL, {
           method: "POST",
           body: JSON.stringify({ action: "get_events" })
        });
        const data = await response.json();
        
        if (data.result === 'success') {
          setEvents(data.data);
          // 3. Update Storage
          sessionStorage.setItem("events_data", JSON.stringify(data.data));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // --- SKELETON LOADER ---
  const EventSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 md:p-8 flex flex-col md:flex-row gap-6 animate-pulse">
      <div className="flex-grow space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="flex gap-4">
           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
        <div className="space-y-2">
           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full md:w-32">
         <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
         <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <motion.main
      className="container mx-auto px-6 py-12 md:py-20 min-h-screen"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-white mb-4">
          Academics & Events
        </h1>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explore our calendar of CMEs, workshops, and conferences.
        </p>
      </div>

      <div className="grid gap-6">
        {loading && !events.length ? (
          <>
            <EventSkeleton />
            <EventSkeleton />
            <EventSkeleton />
          </>
        ) : events.length > 0 ? (
          events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-primary dark:text-white mb-3">{event.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm mb-4 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center"><span className="material-symbols-outlined mr-2">calendar_month</span>{event.date}</div>
                  <div className="flex items-center"><span className="material-symbols-outlined mr-2">location_on</span>{event.location}</div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">{event.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 self-start md:self-center">
                {event.flyerlink && (
                  <a href={event.flyerlink} target="_blank" rel="noreferrer" className="px-6 py-2 border-2 border-primary text-primary dark:text-white dark:border-white font-bold rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition text-center">
                    Download
                  </a>
                )}
                {event.registrationlink && (
                   <a href={event.registrationlink} target="_blank" rel="noreferrer" className="px-6 py-2 bg-yellow-500 text-primary font-bold rounded-full hover:bg-yellow-400 transition text-center shadow-md">
                     Register Now
                   </a>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12">No upcoming events scheduled.</div>
        )}
      </div>
    </motion.main>
  );
};

export default AcademicsEvents;