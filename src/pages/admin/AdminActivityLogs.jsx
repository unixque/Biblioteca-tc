import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useLanguage } from '../../context/LanguageContext'
import { Activity } from 'lucide-react'

const AdminActivityLogs = () => {
  const { t } = useLanguage()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('activity_logs')
        .select('*, profiles(name, email)')
        .order('created_at', { ascending: false })
        .limit(100)
      setLogs(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="page-stack w-full min-w-0">
      <div className="flex items-center gap-3">
        <Activity className="text-primary" size={28} />
        <div>
          <h1 className="text-3xl font-black text-text-main">{t('admin.activity.title')}</h1>
          <p className="text-text-muted">{t('admin.activity.subtitle')}</p>
        </div>
      </div>

      <div className="bg-bg-surface rounded-lg border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-main/50 text-left text-[10px] uppercase tracking-widest text-text-muted">
              <tr>
                <th className="px-6 py-4">{t('admin.activity.when')}</th>
                <th className="px-6 py-4">{t('admin.activity.user')}</th>
                <th className="px-6 py-4">{t('admin.activity.action')}</th>
                <th className="px-6 py-4">{t('admin.activity.details')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-text-muted animate-pulse">
                    {t('navbar.loading')}
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-text-muted italic">
                    {t('admin.activity.empty')}
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-bg-main/30">
                    <td className="px-6 py-3 whitespace-nowrap text-text-muted">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      {log.profiles?.name || log.profiles?.email || '—'}
                    </td>
                    <td className="px-6 py-3 font-medium">{log.action}</td>
                    <td className="px-6 py-3 text-text-muted text-xs max-w-xs truncate">
                      {[log.entity_type, log.entity_id].filter(Boolean).join(' · ')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminActivityLogs
