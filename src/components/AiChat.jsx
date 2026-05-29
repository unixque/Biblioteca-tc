import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLibraryData } from '../context/LibraryDataContext'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { cn } from '../lib/cn'
import { getEdgeFunctionErrorMessage, isOpenAiConfigError } from '../lib/edgeFunctionError'
import { findBookMentionedInText } from '../lib/catalogSnippet'
import ChatMarkdown from './ChatMarkdown'

const AiChat = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)
  const navigate = useNavigate()
  const { books } = useLibraryData()
  const { t, language } = useLanguage()
  const { user } = useAuth()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const userMsg = { role: 'user', content: text }
    setMessages((m) => [...m, userMsg])
    setLoading(true)

    if (!user) {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: t('aiChat.loginRequired') },
      ])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          language,
        },
      })

      if (data?.error) {
        const serverMsg = String(data.error)
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            content: isOpenAiConfigError(serverMsg) ? t('aiChat.noApiKey') : serverMsg,
          },
        ])
        return
      }

      if (error) {
        const detail = await getEdgeFunctionErrorMessage(error, data)
        const unauthorized =
          detail?.toLowerCase().includes('unauthorized') ||
          error?.context?.status === 401
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            content: unauthorized
              ? t('aiChat.loginRequired')
              : isOpenAiConfigError(detail)
                ? t('aiChat.noApiKey')
                : detail || t('aiChat.error'),
          },
        ])
        return
      }

      const reply = data?.reply?.trim()
      if (!reply) {
        setMessages((m) => [...m, { role: 'assistant', content: t('aiChat.error') }])
        return
      }

      const matched = findBookMentionedInText(reply, books)
      const ids = data?.bookIds?.length ? data.bookIds : matched ? [matched.id] : []
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: reply, bookIds: ids },
      ])
    } catch (err) {
      console.error('ai-chat error:', err)
      setMessages((m) => [...m, { role: 'assistant', content: t('aiChat.error') }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 md:bottom-8 right-4 z-40 w-14 h-14 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label={t('aiChat.open')}
      >
        <MessageCircle size={24} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 md:bottom-8 right-4 left-4 sm:left-auto z-50 w-auto sm:w-[min(380px,calc(100%-2rem))] max-w-[380px] h-[min(70vh,520px)] bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant bg-primary text-on-primary">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Sparkles size={18} />
                {t('aiChat.title')}
              </div>
              <button type="button" onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-on-primary/10">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {messages.length === 0 && (
                <p className="text-body-sm text-on-surface-variant">{t('aiChat.welcome')}</p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'text-body-sm rounded-xl px-3 py-2 max-w-[90%]',
                    msg.role === 'user'
                      ? 'ml-auto bg-primary/10 text-on-surface'
                      : 'bg-surface-container text-on-surface-variant'
                  )}
                >
                  {msg.role === 'assistant' ? (
                    <ChatMarkdown text={msg.content} />
                  ) : (
                    msg.content
                  )}
                  {msg.bookIds?.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1">
                      {msg.bookIds.slice(0, 3).map((id) => {
                        const title = books.find((b) => String(b.id) === String(id))?.title
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => {
                              setOpen(false)
                              navigate(`/livro/${id}`)
                            }}
                            className="text-left text-primary font-semibold text-xs hover:underline"
                          >
                            {title ? `→ ${title}` : t('aiChat.viewBook')}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="text-body-sm text-on-surface-variant animate-pulse">{t('aiChat.thinking')}</div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t border-outline-variant flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder={t('aiChat.placeholder')}
                className="flex-1 rounded-xl border border-outline-variant bg-surface-container-low px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={send}
                disabled={loading}
                className="p-2 rounded-xl bg-primary text-on-primary disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AiChat
