import { cn } from '../../lib/cn'

const MaterialIcon = ({ name, size = 24, filled = false, className }) => (
  <span
    className={cn(
      'material-symbols-outlined inline-flex items-center justify-center leading-none',
      filled && 'material-symbols-filled',
      className
    )}
    style={{ fontSize: size }}
    aria-hidden="true"
  >
    {name}
  </span>
)

export default MaterialIcon
