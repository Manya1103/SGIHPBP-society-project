import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GoverningBody from './pages/GoverningBody'
import AboutUs from './pages/AboutUs'
import SecretaryMessage from './pages/SecretaryMessage'
import Membership from './pages/Membership'
import AcademicsEvents from './pages/AcademicsEvents'
import Publications from './pages/Publications'
import ContactUs from './pages/ContactUs'
// import Admin from './pages/Admin'
import PresidentMessage from './pages/PresidentMessage'
import ScrollToTop from './components/ScrollToTop'
import { AnimatePresence } from 'framer-motion'
import JournalSearch from './pages/JournalSearch'
import CaseOfTheMonth from './pages/CaseOfTheMonth'
import MembersDetails from './pages/MemberDetails'
import MembershipRegistration from './pages/MembershipRegistration';

function App() {
  const location = useLocation()
  const currentPage = location.pathname.slice(1) || 'home'

  return (
    <Layout currentPage={currentPage}>
      <ScrollToTop />
      {/* Wrap Routes in AnimatePresence */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/governing-body" element={<GoverningBody />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/secretary-message" element={<SecretaryMessage />} />
          <Route path="/president-message" element={<PresidentMessage />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/members-details" element={<MembersDetails />} />
          <Route path="/academics-events" element={<AcademicsEvents />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/journal-search" element={<JournalSearch />} />
          <Route path="/case-of-the-month" element={<CaseOfTheMonth />} />
          <Route path="/join-membership" element={<MembershipRegistration />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App