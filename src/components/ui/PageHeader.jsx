import { cn } from '../../lib/cn'

const PageHeader = ({ title, subtitle, action, className }) => (
  <header className={cn('flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10', className)}>
    <div className="space-y-2">
      <h1 className="text-headline-md text-on-surface">{title}</h1>
      {subtitle && <p className="text-body-lg text-on-surface-variant">{subtitle}</p>}
    </div>
    {action}
  </header>
)

export default PageHeader
