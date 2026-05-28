import { useNavigate, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../hooks/useAuth'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageContainer from '../components/ui/PageContainer'
import MaterialIcon from '../components/ui/MaterialIcon'
import SectionHeader from '../components/ui/SectionHeader'
import SlideIn from '../components/ui/motion/SlideIn'
import AboutSlideshow from '../components/AboutSlideshow'
import { ABOUT_SLIDES } from '../lib/staticAssets'
import Footer from '../components/Footer'

const Landing = () => {
  const navigate = useNavigate()
  const { t, language, setLanguage } = useLanguage()
  const { user } = useAuth()

  const features = [
    { icon: 'manage_search', title: t('landing.features.search'), desc: t('landing.features.searchDesc') },
    { icon: 'auto_stories', title: t('landing.features.manage'), desc: t('landing.features.manageDesc') },
    { icon: 'hub', title: t('landing.features.access'), desc: t('landing.features.accessDesc') },
  ]

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-surface relative">
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <div className="w-24 sm:w-32">
          <Select
            options={[
              { id: 'pt', name: 'PT' },
              { id: 'en', name: 'EN' },
              { id: 'es', name: 'ES' },
              { id: 'fr', name: 'FR' },
              { id: 'de', name: 'DE' },
              { id: 'nl', name: 'NL' },
            ]}
            value={language}
            onChange={setLanguage}
            triggerClassName="!h-10 !rounded-none"
          />
        </div>
        <Link
          to="/docs"
          className="h-10 w-10 flex items-center justify-center bg-surface-container-lowest border border-outline-variant rounded-none text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all"
          title={t('navbar.docs')}
        >
          <MaterialIcon name="help" size={20} />
        </Link>
      </div>

      <section className="relative min-h-screen h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/media/IMG_3340.MOV" />
          </video>
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-primary/90" />
        </div>

        <PageContainer className="relative z-10 text-center py-24 md:py-32">
          <SlideIn direction="up" delay={0.1}>
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-white/40" />
              <span className="text-label-sm text-white tracking-widest">
                {t('landing.title')}
              </span>
              <span className="h-px w-12 bg-white/40" />
            </div>
          </SlideIn>
          <SlideIn direction="up" delay={0.15}>
            <h1 className="text-display-lg-mobile md:text-display-lg text-white mb-6 max-w-3xl mx-auto drop-shadow-md">
              {t('landing.badge') || 'Biblioteca Digital'}
            </h1>
          </SlideIn>
          <SlideIn direction="up" delay={0.2}>
            <p className="text-body-lg text-white/90 max-w-2xl mx-auto mb-10 italic">
              {t('landing.subtitle')}
            </p>
          </SlideIn>
          <SlideIn direction="up" delay={0.3} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <Button
              variant="surface"
              size="lg"
              uppercase
              onClick={() => navigate('/catalogo')}
              iconRight="arrow_forward"
              className="group"
            >
              {t('landing.exploreBtn')}
            </Button>
            {!user && (
              <Button
                variant="heroOutline"
                size="lg"
                uppercase
                onClick={() => navigate('/login')}
              >
                {t('navbar.login')}
              </Button>
            )}
          </SlideIn>
        </PageContainer>
      </section>

      <PageContainer className="py-section-gap">
        <SectionHeader title="Serviços Académicos" divider className="text-center [&_h2]:text-primary" />
        <div className="grid md:grid-cols-3 gap-gutter">
          {features.map((feature, idx) => (
            <SlideIn key={idx} direction="up" delay={idx * 0.1} className="h-full">
              <Card accent padding="p-8" className="group hover:shadow-ambient transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <MaterialIcon name={feature.icon} size={28} />
                </div>
                <h3 className="text-headline-sm text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-body-md text-on-surface-variant flex-grow">{feature.desc}</p>
              </Card>
            </SlideIn>
          ))}
        </div>
      </PageContainer>

      <section className="bg-surface-container border-y border-outline-variant py-section-gap relative">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <PageContainer className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SlideIn direction="left" delay={0.2} className="space-y-8">
              <span className="text-label-sm text-secondary tracking-widest">{t('landing.aboutTitle')}</span>
              <h2 className="text-display-lg-mobile md:text-display-lg text-primary leading-tight">
                {t('landing.aboutTitle')}
              </h2>
              <p className="text-body-lg text-on-surface-variant">{t('landing.aboutDesc')}</p>
              <div className="flex flex-wrap items-center gap-8 sm:gap-12 pt-4">
                <div className="border-l-2 border-secondary pl-4">
                  <span className="text-headline-md text-on-surface">10k+</span>
                  <p className="text-label-sm text-on-surface-variant mt-1">Livros no Acervo</p>
                </div>
                <div className="border-l-2 border-secondary pl-4">
                  <span className="text-headline-md text-on-surface">100+</span>
                  <p className="text-label-sm text-on-surface-variant mt-1">Anos de História</p>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="right" delay={0.3} className="relative min-w-0 overflow-hidden">
              <div className="relative overflow-hidden">
                <AboutSlideshow slides={ABOUT_SLIDES} />
                <div className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-4 z-10 bg-primary text-on-primary px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-ambient flex items-center gap-2 sm:gap-3 pointer-events-none max-w-[calc(100%-1rem)]">
                  <span className="text-xl font-bold font-serif">100+</span>
                  <span className="text-label-sm tracking-widest">Anos de História</span>
                </div>
              </div>
            </SlideIn>
          </div>
        </PageContainer>
      </section>

      {!user && (
        <PageContainer className="py-section-gap">
          <div className="bg-inverse-surface rounded-xl p-12 text-center relative overflow-hidden border border-outline-variant/30">
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-headline-md text-white mb-6">{t('landing.ctaTitle')}</h2>
              <p className="text-body-lg text-white/80 mb-10 max-w-xl mx-auto">
                {t('landing.ctaDesc')}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
                <Button variant="primary" size="lg" uppercase onClick={() => navigate('/signup')}>
                  {t('navbar.register')}
                </Button>
                <Button variant="heroOutline" size="lg" uppercase onClick={() => navigate('/catalogo')}>
                  {t('landing.exploreBtn')}
                </Button>
              </div>
            </div>
          </div>
        </PageContainer>
      )}

      <Footer />
    </div>
  )
}

export default Landing
