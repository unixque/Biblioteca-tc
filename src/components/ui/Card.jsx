import { cn } from '../../lib/cn'

const Card = ({ children, className, accent = false, padding = 'p-8' }) => (
  <div
    className={cn(
      'bg-surface border border-outline-variant rounded-lg shadow-card-bottom relative overflow-hidden',
      padding,
      className
    )}
  >
    {accent && (
      <div className="absolute top-0 left-0 w-full h-1 bg-surface-variant group-hover:bg-secondary transition-colors" />
    )}
    {children}
  </div>
)

export default Card
