import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo_SGIHPBPS.png'

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Column 1: Society Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                alt="SGIHPBPs of India Logo"
                className="h-14 w-14"
                src={Logo}
              />
              <h3 className="font-display text-lg font-bold">SGIHPBPs of India</h3>
            </div>
            <p className="text-sm text-gray-300">
              The Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologists of India.
            </p>
          </div>

          {/* Column 2: About Us */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about-us" className="text-gray-300 hover:text-gold-light transition-colors">
                  Our Mission & Vision
                </Link>
              </li>
              <li>
                <Link to="/governing-body" className="text-gray-300 hover:text-gold-light transition-colors">
                  Governing Body
                </Link>
              </li>
              <li>
                <Link to="/president-message" className="text-gray-300 hover:text-gold-light transition-colors">
                  President's Message
                </Link>
              </li>
              <li>
                <Link to="/secretary-message" className="text-gray-300 hover:text-gold-light transition-colors">
                  Secretary General's Message
                </Link>
              </li>

            </ul>
          </div>

          {/* Column 3: Quick Links (Updated) */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/academics-events" className="text-gray-300 hover:text-gold-light transition-colors">
                  Academics & Events
                </Link>
              </li>
              <li>
                <Link to="/publications" className="text-gray-300 hover:text-gold-light transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-gray-300 hover:text-gold-light transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-300 hover:text-gold-light transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Contact us</h3>
            <p className="text-sm text-gray-300">
              78, LD Block, PITAMPURA,<br />New Delhi-110034
            </p>
            &nbsp;
            <p className="text-sm text-gray-300">Email: contact@sgihpbps.org</p>
            <p className="text-sm text-gray-300">Phone: 9873898110</p>
          </div>
        </div>

        <div className="mt-12 border-t border-blue-800 pt-6 text-center text-sm text-gray-400">
          <p>© 2024 Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologists of India. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer