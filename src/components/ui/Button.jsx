import { cn } from '../../lib/cn'
import MaterialIcon from './MaterialIcon'

const variants = {
  primary:
    'bg-primary text-on-primary !text-white hover:bg-primary-deep active:brightness-95 shadow-sm border border-white/10 [&_.material-symbols-outlined]:text-inherit',
  heroOutline:
    'bg-transparent border border-white/80 !text-white hover:bg-white/10 hover:border-white [&_.material-symbols-outlined]:text-inherit',
  secondary:
    'bg-transparent border border-outline-variant text-primary hover:bg-surface-container-low',
  ghost:
    'bg-transparent text-on-surface-variant hover:text-primary hover:bg-surface-container-low',
  surface:
    'bg-surface text-on-surface hover:bg-surface-container-low shadow-ambient',
  inverse:
    'bg-transparent border border-inverse-on-surface/40 text-inverse-on-surface hover:bg-inverse-on-surface/10',
  danger:
    'bg-error text-on-error hover:opacity-90',
}

const sizes = {
  sm: 'min-h-9 px-4 py-2 text-label-sm',
  md: 'min-h-12 px-6 py-3 text-body-md font-semibold',
  lg: 'min-h-14 px-8 py-4 text-label-sm',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  iconRight,
  uppercase = false,
  disabled,
  type = 'button',
  ...props
}) => (
  <button
    type={type}
    disabled={disabled}
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-none transition-all duration-200 whitespace-nowrap',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variants[variant],
      sizes[size],
      uppercase && 'uppercase tracking-widest font-semibold',
      className
    )}
    {...props}
  >
    {icon && <MaterialIcon name={icon} size={20} />}
    {children}
    {iconRight && <MaterialIcon name={iconRight} size={20} className="transition-transform group-hover:translate-x-0.5" />}
  </button>
)

export default Button
