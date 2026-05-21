import { Link } from 'react-router-dom'
import PageContainer from '../ui/PageContainer'

const AuthLayout = ({ children, title, subtitle }) => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-12">
    <div className="text-center mb-8">
      <h1 className="text-display-lg-mobile md:text-display-lg text-primary mb-2">
        Biblioteca TC
      </h1>
      <p className="text-body-md text-on-surface-variant italic">
        Onde o conhecimento encontra a permanência.
      </p>
    </div>

    <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-ambient relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
      <header className="mb-8 text-center mt-2">
        <h2 className="text-headline-md text-primary">{title}</h2>
        {subtitle && (
          <p className="text-body-md text-on-surface-variant mt-2">{subtitle}</p>
        )}
      </header>
      {children}
    </div>

    <div className="mt-8 text-center flex flex-wrap justify-center gap-6">
      <Link to="/docs" className="text-label-sm text-on-surface-variant hover:text-primary transition-colors">
        Documentação
      </Link>
      <Link to="/landing" className="text-label-sm text-on-surface-variant hover:text-primary transition-colors">
        Início
      </Link>
    </div>
  </div>
)

export default AuthLayout
