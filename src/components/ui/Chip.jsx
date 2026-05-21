import { cn } from '../../lib/cn'

const Chip = ({ children, active = false, onClick, className }) => {
  const Comp = onClick ? 'button' : 'span'
  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'px-5 py-2 rounded-full text-label-sm shrink-0 transition-colors duration-200',
        active
          ? 'bg-secondary-container text-on-secondary-container border border-transparent hover:bg-secondary hover:text-on-secondary'
          : 'bg-surface text-on-surface border border-outline hover:bg-surface-container',
        className
      )}
    >
      {children}
    </Comp>
  )
}

export default Chip
