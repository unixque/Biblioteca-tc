import { motion, AnimatePresence } from 'framer-motion'
import MaterialIcon from './MaterialIcon'
import { cn } from '../../lib/cn'
import { useNotification } from '../../context/NotificationContext'

const ToastContainer = () => {
  const { toast } = useNotification()

  const icons = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
  }

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[100] flex flex-col items-end gap-2 pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className={cn(
              'pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-lg shadow-ambient border backdrop-blur-md',
              toast.type === 'success' && 'bg-surface-container-lowest border-outline-variant text-tertiary-container',
              toast.type === 'error' && 'bg-error-container border-error/20 text-error',
              toast.type === 'info' && 'bg-surface-container-lowest border-primary/20 text-primary'
            )}
          >
            <MaterialIcon name={icons[toast.type] || 'info'} size={20} filled />
            <span className="text-body-md font-medium text-on-surface">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer
