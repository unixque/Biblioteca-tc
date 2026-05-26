import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export function useWishlist() {
  const { user } = useAuth()
  const [ids, setIds] = useState(new Set())
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    if (!user) {
      setIds(new Set())
      return
    }
    setLoading(true)
    const { data } = await supabase.from('wishlist').select('book_id').eq('user_id', user.id)
    setIds(new Set((data || []).map((r) => String(r.book_id))))
    setLoading(false)
  }, [user])

  useEffect(() => {
    load()
  }, [load])

  const toggle = async (bookId) => {
    if (!user) return { ok: false, needsLogin: true }
    const id = String(bookId)
    if (ids.has(id)) {
      const { error } = await supabase.from('wishlist').delete().eq('user_id', user.id).eq('book_id', bookId)
      if (!error) {
        setIds((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
        await supabase.rpc('log_activity', {
          p_action: 'wishlist_remove',
          p_entity_type: 'book',
          p_entity_id: id,
        }).catch(() => {})
      }
      return { ok: !error, removed: true }
    }
    const { error } = await supabase.from('wishlist').insert({ user_id: user.id, book_id: bookId })
    if (!error) {
      setIds((prev) => new Set(prev).add(id))
      await supabase.rpc('log_activity', {
        p_action: 'wishlist_add',
        p_entity_type: 'book',
        p_entity_id: id,
      }).catch(() => {})
    }
    return { ok: !error, added: true }
  }

  const isWishlisted = (bookId) => ids.has(String(bookId))

  return { ids: [...ids], loading, toggle, isWishlisted, reload: load }
}
