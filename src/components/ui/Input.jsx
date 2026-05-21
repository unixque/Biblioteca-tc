import { cn } from '../../lib/cn'
import MaterialIcon from './MaterialIcon'

const Input = ({
  label,
  icon,
  error,
  className,
  inputClassName,
  id,
  ...props
}) => {
  const inputId = id || props.name

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-label-sm text-on-surface tracking-widest"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-outline pointer-events-none">
            <MaterialIcon name={icon} size={20} />
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full py-3 bg-surface-container-low border border-outline-variant rounded-none',
            'text-body-md text-on-surface placeholder:text-on-surface-variant/60',
            'focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors input-inset',
            icon && 'pl-10 pr-4',
            !icon && 'px-4',
            error && 'border-error focus:border-error focus:ring-error',
            inputClassName
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  )
}

export default Input
