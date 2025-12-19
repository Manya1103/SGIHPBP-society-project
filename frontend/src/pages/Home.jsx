import React, { useState, useEffect } from 'react'
import HeroSection from '../components/sections/HeroSection'
import MissionSection from '../components/sections/MissionSection'
import PresidentSection from '../components/sections/PresidentSection'
import SecretarySection from '../components/sections/SecretarySection'
import QuickLinksSection from '../components/sections/QuickLinksSection'
import EventTicker from '../components/sections/EventTicker'
import CountdownTimer from '../components/common/CountdownTimer'

const Home = () => {
  const [upcomingEvent, setUpcomingEvent] = useState(null);
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-_TLEQ-trht5jI2klTi4GJCL-cYJtbVfRfjkNjqlPTJzd43UXqfSemFGpDKGjsNyKbQ/exec";

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        let events = [];
        
        // Try getting from cache first (populated by Academics page or previous visits)
        const cachedData = sessionStorage.getItem("events_data");
        
        if (cachedData) {
           events = JSON.parse(cachedData);
        } else {
           // Fetch if no cache
           const response = await fetch(GOOGLE_SCRIPT_URL, {
              method: "POST",
              body: JSON.stringify({ action: "get_events" })
           });
           const data = await response.json();
           if (data.result === 'success') {
             events = data.data;
             sessionStorage.setItem("events_data", JSON.stringify(data.data));
           }
        }

        const now = new Date();
        
        // FILTER: Look for valid dates in the future
        const futureEvents = events
          .map(e => {
              // Prefer the robust 'timerdate', fall back to 'date'
              const rawDate = e.timerdate || e.date;
              const parsedDate = new Date(rawDate);
              return { ...e, parsedDate: parsedDate };
          })
          .filter(e => !isNaN(e.parsedDate.getTime()) && e.parsedDate > now)
          .sort((a, b) => a.parsedDate - b.parsedDate);

        if (futureEvents.length > 0) {
          setUpcomingEvent(futureEvents[0]);
        }

      } catch (error) {
        console.error("Error fetching events for home:", error);
      }
    };

    fetchNextEvent();
  }, []);

  return (
    <main>
      <HeroSection />
      <EventTicker />      
      {/* DYNAMIC COUNTDOWN SECTION */}
      {upcomingEvent && (
        <section className="bg-white dark:bg-gray-900 py-16 border-b border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
              Upcoming: {upcomingEvent.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center text-sm md:text-base">
              {upcomingEvent.date} | {upcomingEvent.location}
            </p>
            
            <div className="transform scale-90 sm:scale-100">
              <CountdownTimer targetDate={upcomingEvent.timerdate || upcomingEvent.date} />
            </div>

            <div className="mt-6">
              <a 
                href="/academics-events" 
                className="text-primary font-semibold hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center gap-1 text-sm"
              >
                View Event Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>
      )}
      <MissionSection />
      <PresidentSection />
      <SecretarySection />
      <QuickLinksSection />
    </main>
  )
}

export default Home