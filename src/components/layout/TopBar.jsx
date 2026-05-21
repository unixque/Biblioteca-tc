import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../context/LanguageContext'
import { useSearchParams, Link, useLocation } from 'react-router-dom'
import Select from '../ui/Select'
import MaterialIcon from '../ui/MaterialIcon'
import { cn } from '../../lib/cn'
import { LOGO_URL } from '../../lib/staticAssets'

const TopBar = () => {
  const { user, profile, profileLoading, isAdmin } = useAuth()
  const { t, language, setLanguage } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const query = searchParams.get('q') || ''
  const isDiscoverPage = location.pathname === '/' || location.pathname === '/catalogo'

  const navLink = (path, label) => {
    const active = location.pathname === path || (path === '/catalogo' && location.pathname === '/')
    return (
      <Link
        to={path}
        className={cn(
          'hidden md:block font-body-md text-body-md transition-colors duration-200 pb-1',
          active
            ? 'text-primary font-bold border-b-2 border-primary'
            : 'text-on-surface-variant font-medium hover:text-primary'
        )}
      >
        {label}
      </Link>
    )
  }

  const navControlClass = 'h-10 rounded-none'

  const handleSearch = (e) => {
    const val = e.target.value
    if (val) {
      setSearchParams({ q: val })
    } else {
      searchParams.delete('q')
      setSearchParams(searchParams)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant shadow-sm shadow-primary/5">
      <div className="max-w-container-max mx-auto flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 md:h-20 gap-4">
        <div className="flex items-center gap-6 md:gap-8 shrink-0">
          <Link to={user ? '/catalogo' : '/landing'} className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-9 md:h-9 overflow-hidden shrink-0">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200" />
            </div>
            <span className="hidden lg:block text-headline-sm text-primary tracking-tight leading-none font-serif">
              Biblioteca TC
            </span>
          </Link>
          {user && (
            <nav className="hidden md:flex items-center gap-6">
              {navLink('/catalogo', t('navbar.home'))}
              {!isAdmin && navLink('/emprestimos', t('sidebar.myLibrary'))}
              {isAdmin && navLink('/console', t('sidebar.admin'))}
            </nav>
          )}
        </div>

        <div className="flex-1 min-w-0 max-w-xl relative group hidden sm:block">
          {isDiscoverPage && (
            <>
              <MaterialIcon
                name="search"
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors pointer-events-none"
              />
              <input
                type="text"
                placeholder={t('navbar.searchPlaceholder')}
                value={query}
                onChange={handleSearch}
                className={cn(
                  'topbar-search w-full bg-surface-container-low border border-outline-variant pl-10 pr-4 text-body-md text-on-surface placeholder:text-on-surface-variant/60 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all input-inset',
                  navControlClass
                )}
              />
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="w-20 lg:w-28 hidden lg:block">
            <Select
              options={[
                { id: 'pt', name: 'PT' },
                { id: 'en', name: 'EN' },
                { id: 'es', name: 'ES' },
                { id: 'fr', name: 'FR' },
                { id: 'de', name: 'DE' },
                { id: 'nl', name: 'NL' },
              ]}
              value={language}
              onChange={setLanguage}
              triggerClassName="!h-10 !px-3 !rounded-none !text-label-sm"
            />
          </div>

          <Link
            to="/docs"
            className={cn(
              'hidden md:flex items-center justify-center w-10 hover:bg-surface-container-low border border-transparent hover:border-outline-variant/50 transition-all text-on-surface-variant hover:text-primary',
              navControlClass
            )}
            title={t('navbar.docs')}
          >
            <MaterialIcon name="help" size={20} />
          </Link>

          {user && (
            <Link
              to="/notificacoes"
              className={cn(
                'hidden md:flex relative items-center justify-center w-10 hover:bg-surface-container-low border border-transparent hover:border-outline-variant/50 transition-all text-on-surface-variant hover:text-primary',
                navControlClass
              )}
              title={t('navbar.notifications')}
            >
              <MaterialIcon name="notifications" size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border border-surface" />
            </Link>
          )}

          <Link
            to="/definicoes"
            className={cn(
              'hidden md:flex items-center justify-center w-10 hover:bg-surface-container-low border border-transparent hover:border-outline-variant/50 transition-all text-on-surface-variant hover:text-primary',
              navControlClass
            )}
            title={t('navbar.settings')}
          >
            <MaterialIcon name="settings" size={20} />
          </Link>

          {user ? (
            <div className="flex items-center gap-2 bg-surface-container-low border border-outline-variant px-2 py-1.5 rounded-none">
              <div className="w-8 h-8 rounded-none overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-primary uppercase">
                  {(() => {
                    const name =
                      user.user_metadata?.full_name ||
                      user.user_metadata?.display_name ||
                      profile?.name ||
                      user.email?.split('@')[0] ||
                      'U'
                    const parts = name.trim().split(/\s+/)
                    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
                    return name.substring(0, 2).toUpperCase()
                  })()}
                </span>
              </div>
              <div className="text-left hidden xl:block">
                <p className="text-xs font-semibold text-on-surface leading-tight">
                  {user.user_metadata?.full_name || profile?.name || user.email?.split('@')[0]}
                </p>
                <p className="text-[10px] text-on-surface-variant capitalize">
                  {profileLoading ? t('navbar.loading') : t(`admin.roles.${profile?.role || 'aluno'}`)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className={cn(
                  'inline-flex items-center justify-center px-4 text-label-sm text-primary border border-outline-variant hover:bg-surface-container-low transition-colors',
                  navControlClass
                )}
              >
                {t('navbar.login')}
              </Link>
              <Link
                to="/signup"
                className={cn(
                  'inline-flex items-center justify-center px-4 text-label-sm text-on-primary bg-primary hover:bg-primary-deep transition-colors shadow-ambient',
                  navControlClass
                )}
              >
                {t('navbar.register')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopBar
