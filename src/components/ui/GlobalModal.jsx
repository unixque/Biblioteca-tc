import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MaterialIcon from './MaterialIcon'
import { cn } from '../../lib/cn'
import { useNotification } from '../../context/NotificationContext'

const iconMap = {
  warning: 'report_problem',
  danger: 'shield',
  success: 'check_circle',
  info: 'info',
}

const GlobalModal = () => {
  const { modal } = useNotification()
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (modal?.isPrompt) setInputValue('')
  }, [modal])

  return (
    <AnimatePresence>
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-sm"
            onClick={modal.onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-ambient w-full max-w-sm relative z-10"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-xl" />
            <div className="flex gap-4 mb-4 mt-1">
              <div
                className={cn(
                  'p-3 rounded-lg shrink-0',
                  modal.type === 'danger' && 'bg-error-container text-error',
                  modal.type === 'warning' && 'bg-secondary-container text-secondary',
                  modal.type === 'success' && 'bg-tertiary-fixed/30 text-tertiary-container',
                  (!modal.type || modal.type === 'info') && 'bg-primary/10 text-primary'
                )}
              >
                <MaterialIcon name={iconMap[modal.type] || 'info'} size={24} filled />
              </div>
              <div className="pt-1 flex-grow">
                <h3 className="text-headline-sm text-on-surface leading-tight">{modal.title}</h3>
                <p className="text-body-md text-on-surface-variant mt-2 leading-relaxed">{modal.message}</p>
                {modal.isPrompt && (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={modal.placeholder}
                    className="w-full mt-4 bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary input-inset"
                    autoFocus
                  />
                )}
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-6">
              <button
                onClick={modal.onCancel}
                className="px-5 py-2.5 text-label-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors"
              >
                {modal.cancelText || 'Cancelar'}
              </button>
              <button
                onClick={() => (modal.isPrompt ? modal.onConfirm(inputValue) : modal.onConfirm())}
                className={cn(
                  'px-5 py-2.5 text-label-sm text-on-primary rounded-lg transition-all shadow-sm',
                  modal.type === 'danger' && 'bg-error hover:opacity-90',
                  modal.type === 'warning' && 'bg-secondary hover:opacity-90',
                  modal.type === 'success' && 'bg-tertiary-container hover:opacity-90',
                  (modal.type === 'info' || !modal.type) && 'bg-primary hover:bg-primary-deep'
                )}
              >
                {modal.confirmText || 'Confirmar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default GlobalModal
