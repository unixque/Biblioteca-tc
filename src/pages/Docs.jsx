import { useLanguage } from '../context/LanguageContext'
import PageHeader from '../components/ui/PageHeader'
import MaterialIcon from '../components/ui/MaterialIcon'
import Card from '../components/ui/Card'

const DOC_ICONS = {
  borrow: 'menu_book',
  pin: 'key',
  duration: 'schedule',
  ai: 'auto_awesome',
  fine: 'warning',
  feedback: 'forum',
}

const DocSection = ({ icon, title, children }) => (
  <Card padding="p-6 md:p-8" className="hover:shadow-ambient transition-shadow duration-300">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center text-primary shrink-0">
        <MaterialIcon name={icon} size={28} />
      </div>
      <div className="space-y-3 flex-grow min-w-0">
        <h2 className="text-headline-sm text-on-surface">{title}</h2>
        <div className="text-body-lg text-on-surface-variant leading-relaxed">{children}</div>
      </div>
    </div>
  </Card>
)

const Docs = () => {
  const { t } = useLanguage()
  const sections = ['borrow', 'pin', 'duration', 'ai', 'fine', 'feedback']

  return (
    <div className="max-w-3xl mx-auto w-full page-stack">
      <PageHeader
        title={t('docs.title')}
        subtitle={t('docs.subtitle')}
      />
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container text-label-sm -mt-4">
        <MaterialIcon name="help" size={16} />
        {t('docs.badge')}
      </span>

      <div className="section-inner">
        {sections.map((id) => (
          <DocSection key={id} icon={DOC_ICONS[id]} title={t(`docs.${id}.title`)}>
            <p>{t(`docs.${id}.desc`)}</p>
          </DocSection>
        ))}
      </div>
    </div>
  )
}

export default Docs
