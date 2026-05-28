import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../context/LanguageContext'
import MaterialIcon from '../ui/MaterialIcon'
import { cn } from '../../lib/cn'

const MobileNav = () => {
  const { user, isAdmin } = useAuth()
  const { t } = useLanguage()
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/console') return location.pathname.startsWith('/console')
    if (path === '/catalogo') return location.pathname === '/' || location.pathname === '/catalogo'
    return location.pathname === path
  }

  const items = [
    { to: '/catalogo', icon: 'home', label: t('navbar.home') },
    ...(user && isAdmin
      ? [{ to: '/console', icon: 'grid_view', label: t('sidebar.admin') }]
      : user
        ? [{ to: '/emprestimos', icon: 'menu_book', label: t('sidebar.myLibrary') }]
        : []),
    ...(user ? [{ to: '/notificacoes', icon: 'notifications', label: t('navbar.notifications') }] : []),
    { to: '/docs', icon: 'help', label: t('navbar.docs') },
    { to: '/definicoes', icon: 'person', label: t('navbar.settings') },
  ]

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 flex justify-around items-center px-1 sm:px-4 py-2 bg-surface/95 backdrop-blur-lg border-t border-outline-variant shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-xl max-w-[100vw]"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      {items.map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          className={cn(
            'flex flex-col items-center justify-center transition-transform duration-200 active:scale-90 px-2 sm:px-3 py-1 min-w-0',
            isActive(to)
              ? 'text-primary bg-primary/12 rounded-full'
              : 'text-on-surface-variant hover:text-on-surface'
          )}
        >
          <MaterialIcon name={icon} size={22} filled={isActive(to)} />
          <span className="text-[9px] sm:text-[10px] mt-0.5 sm:mt-1 text-label-sm truncate max-w-[4.5rem]">{label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default MobileNav
