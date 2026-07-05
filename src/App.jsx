import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Sidebar from './components/layout/Sidebar'
import PageTransition from './components/layout/PageTransition'
import PatientDetails from "./pages/PatientDetails";

import Home from './pages/Home'
import Prediction from './pages/Prediction'
import Results from './pages/Results'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function ConsoleLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-ink-50/60">{children}</main>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PublicLayout>
              <PageTransition><Home /></PageTransition>
            </PublicLayout>
          }
        />
        <Route
          path="/predict"
          element={
            <ConsoleLayout>
              <PageTransition><Prediction /></PageTransition>
            </ConsoleLayout>
          }
        />
        <Route
          path="/results"
          element={
            <ConsoleLayout>
              <PageTransition><Results /></PageTransition>
            </ConsoleLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ConsoleLayout>
              <PageTransition><Dashboard /></PageTransition>
            </ConsoleLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <PageTransition><About /></PageTransition>
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <PageTransition><Contact /></PageTransition>
            </PublicLayout>
          }
        />
        <Route
          path="*"
          element={
            <PublicLayout>
              <PageTransition><NotFound /></PageTransition>
            </PublicLayout>
          }
        />
        <Route path="/patient/:id" element={<PatientDetails />} />
      </Routes>
    </AnimatePresence>
  )
}
