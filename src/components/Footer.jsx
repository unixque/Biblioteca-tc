import { Link } from 'react-router-dom'
import { LOGOTIPO_URL } from '../lib/staticAssets'
import { useLanguage } from '../context/LanguageContext'
import FadeIn from './ui/motion/FadeIn'
import PageContainer from './ui/PageContainer'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="w-full bg-surface-container border-t border-outline-variant mt-auto">
      <PageContainer className="py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="flex items-center gap-4">
            <img src={LOGOTIPO_URL} alt="Logotipo Agrupamento" className="h-16" />
            <div>
              <h4 className="text-headline-sm text-on-surface leading-tight">Agrupamento de Escolas</h4>
              <p className="text-on-surface-variant text-body-md font-medium">Tomás Cabreira</p>
            </div>
          </div>

          <div>
            <h5 className="text-label-sm text-secondary mb-4">{t('footer.contacts')}</h5>
            <ul className="space-y-3 text-body-md text-on-surface-variant font-medium">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                </span>
                <span>289 889 570</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                </span>
                <div className="space-y-2">
                  <a href="mailto:secretaria@agr-tc.pt" className="block hover:text-primary transition-colors">
                    secretaria@agr-tc.pt
                  </a>
                  <a href="mailto:direcao.agrupamento@agr-tc.pt" className="block hover:text-primary transition-colors">
                    direcao.agrupamento@agr-tc.pt
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-label-sm text-secondary mb-4">{t('footer.usefulLinks')}</h5>
            <div className="space-y-3 text-body-md text-on-surface-variant font-medium">
              <a href="https://sdurao.com/tc/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="text-primary">→</span> {t('footer.platform')}
              </a>
              <a href="https://www.moodle25.agr-tc.pt/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="text-primary">→</span> {t('footer.moodle')}
              </a>
              <a href="https://agr-tc.pt/wp/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="text-primary">→</span> {t('footer.website')}
              </a>
              <Link to="/docs" className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="text-primary">→</span> {t('footer.docs')}
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>

      <div className="border-t border-outline-variant/30">
        <PageContainer className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-body-md text-on-surface-variant">
            {t('footer.rights').replace('{year}', new Date().getFullYear())}
          </p>
          <div className="flex items-center gap-3 text-body-md text-on-surface-variant font-medium">
            <Link to="/docs?tab=privacy" className="hover:text-primary transition-colors">
              {t('docs.privacy.title')}
            </Link>
            <span className="text-outline-variant">•</span>
            <Link to="/docs?tab=terms" className="hover:text-primary transition-colors">
              {t('docs.terms.title')}
            </Link>
          </div>
        </PageContainer>
      </div>
    </footer>
  )
}

export default Footer
