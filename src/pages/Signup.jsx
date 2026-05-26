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
          error={email && !/^al\d{5}@agr-tc\.pt$/i.test(email) ? 'O email deve terminar com @agr-tc.pt (ex: al12345@agr-tc.pt)' : ''}
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

        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full" 
          iconRight="person_add"
        >
          {loading ? '...' : t('auth.signUpBtn')}
        </Button>
      </form>

      <div className="relative flex items-center py-6">
        <div className="flex-grow border-t border-outline-variant" />
        <span className="flex-shrink-0 mx-4 text-label-sm text-outline">{t('auth.or')}</span>
        <div className="flex-grow border-t border-outline-variant" />
      </div>

      <Button type="button" variant="secondary" className="w-full" onClick={() => signInWithGoogle()}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
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
