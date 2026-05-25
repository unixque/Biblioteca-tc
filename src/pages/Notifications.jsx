import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../context/LanguageContext'
import PageHeader from '../components/ui/PageHeader'
import MaterialIcon from '../components/ui/MaterialIcon'
import Button from '../components/ui/Button'
import { cn } from '../lib/cn'

const Notifications = () => {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      if (!error && data) setNotifications(data)
      setLoading(false)
    }
    fetchNotifications()

    const channel = supabase
      .channel('user_notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => setNotifications((prev) => [payload.new, ...prev])
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  const markAsRead = async (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    await supabase.from('notifications').update({ read: true }).eq('id', id)
  }

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    await supabase.from('notifications').update({ read: true }).eq('user_id', user.id)
  }

  const iconFor = (type) => {
    if (type === 'success') return 'check_circle'
    if (type === 'warning') return 'warning'
    if (type === 'error') return 'error'
    return 'info'
  }

  return (
    <div className="max-w-3xl mx-auto w-full page-stack">
      <PageHeader
        title={t('notifications.title')}
        subtitle={t('notifications.subtitle')}
        action={
          notifications.some((n) => !n.read) ? (
            <Button variant="secondary" size="sm" onClick={markAllAsRead} icon="done_all">
              Marcar tudo como lido
            </Button>
          ) : null
        }
      />

      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-card-bottom overflow-hidden min-h-[320px]">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-surface-container animate-pulse rounded-lg" />
            ))}
          </div>
        ) : notifications.length > 0 ? (
          <div className="divide-y divide-outline-variant/40">
            {notifications.map((n) => (
              <div
                key={n.id}
                role="button"
                tabIndex={0}
                onClick={() => !n.read && markAsRead(n.id)}
                onKeyDown={(e) => e.key === 'Enter' && !n.read && markAsRead(n.id)}
                className={cn(
                  'p-6 flex gap-4 transition-colors cursor-pointer',
                  !n.read ? 'bg-primary/5' : 'hover:bg-surface-container-low'
                )}
              >
                <MaterialIcon name={iconFor(n.type)} size={22} filled className="shrink-0 mt-0.5 text-primary" />
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <h3
                      className={cn(
                        'text-body-md font-semibold',
                        !n.read ? 'text-on-surface' : 'text-on-surface-variant'
                      )}
                    >
                      {n.title}
                    </h3>
                    <span className="text-label-sm text-on-surface-variant whitespace-nowrap shrink-0">
                      {new Date(n.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-body-md text-on-surface-variant text-sm">{n.message}</p>
                </div>
                {!n.read && (
                  <span className="w-2.5 h-2.5 bg-primary rounded-full shrink-0 self-center shadow-[0_0_8px_rgba(99,29,29,0.45)]" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center space-y-4">
            <MaterialIcon name="notifications" size={40} className="text-outline mx-auto" />
            <h3 className="text-headline-sm text-on-surface">{t('notifications.emptyTitle')}</h3>
            <p className="text-body-md text-on-surface-variant">{t('notifications.emptyDesc')}</p>
            <Link to="/catalogo">
              <Button variant="primary" size="sm">
                {t('notifications.exploreCatalog')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
