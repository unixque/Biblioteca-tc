import MaterialIcon from './MaterialIcon'
import { cn } from '../../lib/cn'

const SectionDivider = ({ className }) => (
  <div className={cn('flex items-center justify-center my-8 md:my-10 opacity-60', className)}>
    <div className="w-16 h-px bg-secondary" />
    <MaterialIcon name="change_history" size={16} filled className="text-secondary mx-4" />
    <div className="w-16 h-px bg-secondary" />
  </div>
)

export default SectionDivider
