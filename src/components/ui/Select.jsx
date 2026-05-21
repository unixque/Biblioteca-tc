import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'
import MaterialIcon from './MaterialIcon'
import { useLanguage } from '../../context/LanguageContext'

const Select = ({ options, value, onChange, label, placeholder, triggerClassName }) => {
  const { t } = useLanguage()
  const defaultPlaceholder = placeholder || t('admin.common.select.placeholder')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const selectedOption = options.find((opt) => opt.id.toString() === value.toString())

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={cn('relative', label && 'space-y-2')} ref={containerRef}>
      {label && (
        <label className="text-label-sm text-on-surface-variant ml-1">{label}</label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full h-10 bg-surface-container-low border border-outline-variant rounded-none px-4 text-sm flex items-center justify-between cursor-pointer transition-all input-inset hover:border-outline',
          isOpen && 'border-primary ring-1 ring-primary',
          triggerClassName
        )}
      >
        <span
          className={cn(
            'font-medium truncate',
            selectedOption ? 'text-on-surface' : 'text-on-surface-variant opacity-60'
          )}
        >
          {selectedOption ? selectedOption.name : defaultPlaceholder}
        </span>
        <MaterialIcon
          name="expand_more"
          size={18}
          className={cn('text-on-surface-variant transition-transform duration-200', isOpen && 'rotate-180 text-primary')}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[100] left-0 right-0 mt-2 bg-surface-container-lowest border border-outline-variant rounded-none custom-select-shadow overflow-hidden p-1"
          >
            <div className="max-h-[240px] overflow-y-auto custom-scrollbar-h">
              {options.length > 0 ? (
                options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => {
                      onChange(option.id.toString())
                      setIsOpen(false)
                    }}
                    className={cn(
                      'flex items-center px-4 py-2.5 rounded-none cursor-pointer transition-colors text-sm',
                      value.toString() === option.id.toString()
                        ? 'bg-secondary-container/50 text-primary font-semibold'
                        : 'text-on-surface hover:bg-surface-container-low'
                    )}
                  >
                    <span className="truncate">{option.name}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-on-surface-variant text-label-sm text-center opacity-60">
                  {t('admin.common.select.noOptions')}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Select
