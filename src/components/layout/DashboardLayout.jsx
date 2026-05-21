import { useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import MobileNav from './MobileNav'
import Footer from '../Footer'
const DashboardLayout = ({ children }) => {
  const location = useLocation()
  const showFooter = ['/', '/catalogo', '/docs'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-surface flex flex-col md:h-screen md:overflow-hidden">
      <div className="flex-grow flex flex-col min-w-0 md:h-full md:overflow-y-auto custom-scrollbar">
        <TopBar />
        <main
          className={`flex-grow pt-6 md:pt-8 ${showFooter ? 'pb-28 md:pb-16' : 'pb-28 md:pb-12'}`}
        >
          <div className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop">
            {children}
          </div>
        </main>
        {showFooter && <Footer />}
      </div>
      <MobileNav />
    </div>
  )
}

export default DashboardLayout
