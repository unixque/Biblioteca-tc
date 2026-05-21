import { cn } from '../../lib/cn'
import MaterialIcon from './MaterialIcon'

const SectionHeader = ({
  title,
  subtitle,
  icon,
  divider = false,
  className,
  action,
}) => (
  <div className={cn('mb-8', className)}>
    <div className="flex justify-between items-end gap-4">
      <div>
        {icon && (
          <h2 className="text-headline-md text-on-surface flex items-center gap-2 mb-2">
            <MaterialIcon name={icon} size={24} filled className="text-secondary" />
            {title}
          </h2>
        )}
        {!icon && <h2 className="text-headline-md text-on-surface mb-2">{title}</h2>}
        {subtitle && (
          <p className="text-body-lg text-on-surface-variant max-w-2xl">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
    {divider && (
      <div className="flex items-center justify-center gap-4 text-secondary mt-6">
        <span className="h-px w-16 bg-outline-variant" />
        <MaterialIcon name="diamond" size={12} filled />
        <span className="h-px w-16 bg-outline-variant" />
      </div>
    )}
  </div>
)

export default SectionHeader
