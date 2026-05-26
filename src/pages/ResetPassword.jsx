import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AuthLayout from '../components/layout/AuthLayout'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import MaterialIcon from '../components/ui/MaterialIcon'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!password || password.length < 8) {
      setError('A password deve ter pelo menos 8 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('As passwords não coincidem.')
      return
    }

    setLoading(true)
    const { error: err } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (err) {
      setError(err.message)
    } else {
      setSuccess(true)
      setTimeout(() => navigate('/entrar'), 2000)
    }
  }

  return (
    <AuthLayout
      title="Nova password"
      subtitle="Defina uma nova password para a sua conta BibliotecaTC."
    >
      {error && (
        <div className="bg-error-container border border-error/20 p-4 rounded-lg flex gap-3 text-error mb-6">
          <MaterialIcon name="error" size={20} />
          <p className="text-body-md">{error}</p>
        </div>
      )}

      {success ? (
        <div className="bg-tertiary-fixed/30 border border-outline-variant p-5 rounded-lg flex gap-3">
          <MaterialIcon name="check_circle" size={22} className="text-tertiary-container shrink-0" />
          <div className="text-body-md text-on-surface-variant">
            <p className="font-semibold text-on-surface mb-1">Password atualizada!</p>
            Será redirecionado para o início de sessão.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Nova password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirmar password"
            type="password"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'A guardar...' : 'Guardar nova password'}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}

export default ResetPassword

