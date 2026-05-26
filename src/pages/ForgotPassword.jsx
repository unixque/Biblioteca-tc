import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { formatAuthError } from '../lib/authErrorMessage'
import { useLanguage } from '../context/LanguageContext'
import AuthLayout from '../components/layout/AuthLayout'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import MaterialIcon from '../components/ui/MaterialIcon'

const ForgotPassword = () => {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-password`,
    })

    setLoading(false)
    if (err) setError(formatAuthError(err, t))
    else setSent(true)
  }

  return (
    <AuthLayout title="Recuperar password" subtitle="Enviaremos um link para o seu email">
      {error && (
        <div className="bg-error-container border border-error/20 p-4 rounded-lg flex gap-3 text-error mb-6">
          <MaterialIcon name="error" size={20} />
          <p className="text-body-md">{error}</p>
        </div>
      )}

      {sent ? (
        <div className="space-y-5">
          <div className="bg-tertiary-fixed/30 border border-outline-variant p-5 rounded-lg flex gap-3">
            <MaterialIcon name="check_circle" size={22} className="text-tertiary-container shrink-0" />
            <div className="text-body-md text-on-surface-variant">
              <p className="font-semibold text-on-surface mb-1">Email enviado!</p>
              Verifique <strong>{email}</strong> e siga o link para redefinir a password.
            </div>
          </div>
          <Button variant="secondary" className="w-full" onClick={() => { setSent(false); setEmail('') }}>
            Reenviar email
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label={t('auth.emailLabel')}
            icon="mail"
            type="email"
            required
            autoComplete="email"
            placeholder={t('auth.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" disabled={loading} className="w-full" icon="mail">
            {loading ? '...' : 'Enviar link de recuperação'}
          </Button>
        </form>
      )}

      <Link
        to="/entrar"
        className="flex items-center justify-center gap-2 text-body-md text-on-surface-variant hover:text-primary mt-8 transition-colors"
      >
        <MaterialIcon name="arrow_back" size={18} />
        Voltar ao início de sessão
      </Link>
    </AuthLayout>
  )
}

export default ForgotPassword
