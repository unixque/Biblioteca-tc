import React, { useState, useEffect } from 'react';

/**
 * Simple accessible accordion component.
 * Accepts an array of items with title and content.
 * Supports defaultOpenId to auto-open and scroll to a specific section.
 */
const Accordion = ({ items, defaultOpenId }) => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (defaultOpenId) {
      const idx = items.findIndex((item) => item.id === defaultOpenId);
      if (idx !== -1) {
        setOpenIndex(idx);
        // Scroll to the element after a short delay for layout to settle
        setTimeout(() => {
          const el = document.getElementById(defaultOpenId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    }
  }, [defaultOpenId, items]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="border border-outline-variant rounded-md overflow-hidden">
          <button
            id={item.id}
            type="button"
            aria-expanded={openIndex === idx}
            className={`w-full flex justify-between items-center p-4 ${openIndex === idx ? 'bg-primary/10' : 'bg-surface-container'} hover:bg-surface-container/80 transition-colors`}
            onClick={() => toggle(idx)}
          >
            <span className={`text-headline-sm font-medium ${openIndex === idx ? 'text-primary' : 'text-on-surface'}`}>{item.title}</span>
            <span className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${openIndex === idx ? 'text-primary rotate-180' : 'text-on-surface-variant'}`}>
              expand_more
            </span>
          </button>
          {openIndex === idx && (
            <div className="p-4 bg-surface-container/50 text-body-lg text-on-surface-variant overflow-hidden transition-all duration-300"
              style={{ maxHeight: openIndex === idx ? '2000px' : '0px' }}
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
