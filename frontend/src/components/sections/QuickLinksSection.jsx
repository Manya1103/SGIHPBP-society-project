import { Link } from 'react-router-dom'

const QuickLinksSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background-light dark:bg-primary">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
            Quick Links
          </h2>
          <div className="w-24 h-1 bg-gold-DEFAULT mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-background-dark p-8 rounded-lg shadow-md text-center border-t-4 border-gold-DEFAULT">
            <h3 className="font-display text-2xl font-bold text-primary dark:text-white mb-4">
              President's Message
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Read a welcoming address from our esteemed President, Prof Puja Sakhuja.
            </p>
            <Link to="/president-message" className="font-bold text-primary dark:text-gold-light hover:underline">
              Read More
            </Link>
          </div>
          
          <div className="bg-white dark:bg-background-dark p-8 rounded-lg shadow-md text-center border-t-4 border-gold-DEFAULT">
            <h3 className="font-display text-2xl font-bold text-primary dark:text-white mb-4">
              Become a Member
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join a vibrant community of professionals. Access exclusive resources, events, and networking opportunities.
            </p>
            <Link to="/membership" className="font-bold text-primary dark:text-gold-light hover:underline">
              Join Us Today
            </Link>
          </div>
          
          <div className="bg-white dark:bg-background-dark p-8 rounded-lg shadow-md text-center border-t-4 border-gold-DEFAULT">
            <h3 className="font-display text-2xl font-bold text-primary dark:text-white mb-4">
              Events
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Stay updated with our latest conferences, workshops, and webinars. Enhance your knowledge and skills.
            </p>
            <Link to="/academics-events" className="font-bold text-primary dark:text-gold-light hover:underline">
              Explore Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickLinksSection