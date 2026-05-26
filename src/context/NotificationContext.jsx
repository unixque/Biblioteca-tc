import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import GlobalModal from '../components/ui/GlobalModal'
import ToastContainer from '../components/ui/ToastContainer'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

const NotificationContext = createContext({})

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const [toast, setToast] = useState(null)
  const [modal, setModal] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const { user } = useAuth()

  const refreshUnread = useCallback(async () => {
    if (!user) { setUnreadCount(0); return }
    const { count } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('read', false)
    setUnreadCount(count || 0)
  }, [user])

  useEffect(() => {
    refreshUnread()
    if (!user) return
    const channel = supabase
      .channel('unread_badge')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        () => refreshUnread()
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [user, refreshUnread])

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now()
    setToast({ id, message, type })
    setTimeout(() => {
      setToast((current) => current?.id === id ? null : current)
    }, duration)
  }, [])

  const confirm = useCallback(({ title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', type = 'warning' }) => {
    return new Promise((resolve) => {
      setModal({
        title,
        message,
        confirmText,
        cancelText,
        type,
        onConfirm: () => {
          resolve(true)
          setModal(null)
        },
        onCancel: () => {
          resolve(false)
          setModal(null)
        }
      })
    })
  }, [])

  const promptMessage = useCallback(({ title, message, placeholder = '', confirmText = 'Confirmar', cancelText = 'Cancelar', type = 'info' }) => {
    return new Promise((resolve) => {
      setModal({
        title,
        message,
        confirmText,
        cancelText,
        type,
        isPrompt: true,
        placeholder,
        onConfirm: (value) => {
          resolve(value)
          setModal(null)
        },
        onCancel: () => {
          resolve(null)
          setModal(null)
        }
      })
    })
  }, [])

  return (
    <NotificationContext.Provider value={{ showToast, confirm, prompt: promptMessage, toast, modal, setModal, unreadCount, refreshUnread }}>
      {children}
      <GlobalModal />
      <ToastContainer />
    </NotificationContext.Provider>
  )
}
