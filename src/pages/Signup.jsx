import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../context/LanguageContext'
import { supabase } from '../lib/supabase'
import AuthLayout from '../components/layout/AuthLayout'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import MaterialIcon from '../components/ui/MaterialIcon'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { signUp, signInWithGoogle } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const emailRegex = /^al\d{5}@agr-tc\.pt$/i
    if (!emailRegex.test(email)) {
      setError('Por favor, utilize o email da escola (ex: al12345@agr-tc.pt)')
      setLoading(false)
      return
    }

    const { data: authData, error: authError } = await signUp({
      email,
      password,
      options: { data: { full_name: username } },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (authData.user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: authData.user.id,
          name: username,
          email: email,
          role: 'aluno',
        },
      ])

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }
      navigate('/')
    } else {
      setError('Não foi possível criar a conta. Contacte o administrador.')
      setLoading(false)
    }
  }

  return (
    <AuthLayout title={t('auth.signupTitle')} subtitle={t('auth.signupSubtitle')}>
      {error && (
        <div className="bg-error-container border border-error/20 p-4 rounded-lg flex items-start gap-3 text-error text-body-md mb-6">
          <MaterialIcon name="error" size={20} />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label={t('auth.nameLabel')}
          icon="person"
          type="text"
          required
          placeholder={t('auth.namePlaceholder')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label={t('auth.emailLabel')}
          icon="mail"
          type="email"
          required
          autoComplete="email"
          placeholder="al12345@agr-tc.pt"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label={t('auth.passwordLabel')}
          icon="lock"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          placeholder={t('auth.passwordPlaceholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" disabled={loading} className="w-full" iconRight="person_add">
          {loading ? '...' : t('auth.signUpBtn')}
        </Button>
      </form>

      <div className="relative flex items-center py-6">
        <div className="flex-grow border-t border-outline-variant" />
        <span className="flex-shrink-0 mx-4 text-label-sm text-outline">{t('auth.or')}</span>
        <div className="flex-grow border-t border-outline-variant" />
      </div>

      <Button type="button" variant="secondary" className="w-full" onClick={() => signInWithGoogle()}>
        {t('auth.googleBtn')}
      </Button>

      <p className="text-center text-body-md text-on-surface-variant mt-8">
        {t('auth.hasAccount')}{' '}
        <Link to="/entrar" className="text-primary font-semibold hover:underline">
          {t('auth.loginLink')}
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Signup
