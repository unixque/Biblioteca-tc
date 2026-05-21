import { cn } from '../../lib/cn'

const SettingsPanel = ({ icon: Icon, title, children, className }) => (
  <div
    className={cn(
      'bg-surface-container-lowest rounded-lg border border-outline-variant shadow-card-bottom overflow-hidden',
      className
    )}
  >
    {title && (
      <div className="px-6 py-4 md:px-8 md:py-5 border-b border-outline-variant flex items-center gap-3">
        {Icon && <Icon size={18} className="text-primary shrink-0" />}
        <h2 className="text-body-md font-semibold text-on-surface">{title}</h2>
      </div>
    )}
    <div className="px-6 py-5 md:px-8 md:py-6">{children}</div>
  </div>
)

export default SettingsPanel
