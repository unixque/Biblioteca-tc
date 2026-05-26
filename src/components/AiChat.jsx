import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLibraryData } from '../context/LibraryDataContext'
import { useLanguage } from '../context/LanguageContext'
import { cn } from '../lib/cn'

const AiChat = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)
  const navigate = useNavigate()
  const { books } = useLibraryData()
  const { t, language } = useLanguage()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const catalogSnippet = books
    .filter((b) => b.available_qty > 0)
    .slice(0, 80)
    .map((b) => `- ${b.title} (${b.author || '?'}) [id:${b.id}] cat:${b.categories?.name || ''}`)
    .join('\n')

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const userMsg = { role: 'user', content: text }
    setMessages((m) => [...m, userMsg])
    setLoading(true)

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (!apiKey) {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: t('aiChat.noApiKey') },
      ])
      setLoading(false)
      return
    }

    const langNames = { pt: 'português', en: 'english', es: 'español', fr: 'français', de: 'deutsch', nl: 'nederlands' }

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are BibliotecaTC assistant for a school library. Reply in ${langNames[language] || 'português'}. Recommend books from this catalog only. When recommending, include book title and mention they can open it. Catalog:\n${catalogSnippet}`,
            },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            userMsg,
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      })
      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || t('aiChat.error')
      const match = books.find((b) => reply.toLowerCase().includes(b.title.toLowerCase()))
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: reply, bookId: match?.id },
      ])
    } catch {
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
            className="fixed bottom-24 md:bottom-8 right-4 z-50 w-[min(100vw-2rem,380px)] h-[min(70vh,520px)] bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl flex flex-col overflow-hidden"
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
                  {msg.content}
                  {msg.bookId && (
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false)
                        navigate(`/livro/${msg.bookId}`)
                      }}
                      className="block mt-2 text-primary font-semibold text-xs"
                    >
                      {t('aiChat.viewBook')}
                    </button>
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
