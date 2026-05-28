import { useLanguage } from '../context/LanguageContext';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import Accordion from '../components/ui/Accordion';
import Card from '../components/ui/Card';
import MaterialIcon from '../components/ui/MaterialIcon';

const DOC_ICONS = {
  borrow: 'menu_book',
  pin: 'key',
  duration: 'schedule',
  ai: 'auto_awesome',
  fine: 'warning',
  feedback: 'forum',
};

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
);

const Docs = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const defaultOpenId = searchParams.get('tab');
  const sections = ['borrow', 'pin', 'duration', 'ai', 'fine', 'feedback'];

  const accordionItems = [
    {
      id: 'docs',
      title: t('docs.title'),
      content: (
        <div className="space-y-4">
          {sections.map((id) => (
            <DocSection key={id} icon={DOC_ICONS[id]} title={t(`docs.${id}.title`)}>
              <p>{t(`docs.${id}.desc`)}</p>
            </DocSection>
          ))}
        </div>
      ),
    },
    {
      id: 'privacy',
      title: t('docs.privacy.title'),
      content: (
        <div className="text-body-lg text-on-surface-variant pr-content break-words overflow-x-auto" dangerouslySetInnerHTML={{ __html: t('docs.privacy.content') }} />
      ),
    },
    {
      id: 'terms',
      title: t('docs.terms.title'),
      content: (
        <div className="text-body-lg text-on-surface-variant pr-content break-words overflow-x-auto" dangerouslySetInnerHTML={{ __html: t('docs.terms.content') }} />
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto w-full min-w-0 page-stack">
      <PageHeader title={t('docs.title')} subtitle={t('docs.subtitle')} />
      <Accordion items={accordionItems} defaultOpenId={defaultOpenId} />
    </div>
  );
};

export default Docs;
