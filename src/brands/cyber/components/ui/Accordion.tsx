import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { EASE } from '../../lib/motion'

export interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  light?: boolean
}

/** Accessible single-open accordion used for FAQs. */
export function Accordion({ items, light = false }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className={`divide-y ${light ? 'divide-abyss-900/10' : 'divide-white/10'}`}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-violet"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-panel-${i}`}
            >
              <span
                className={`font-display text-lg sm:text-xl font-semibold ${light ? 'text-abyss-900' : 'text-white'}`}
              >
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={`grid size-9 shrink-0 place-items-center rounded-full border ${
                  light ? 'border-abyss-900/15 text-abyss-900' : 'border-white/20 text-white'
                } ${isOpen ? 'bg-brand-gradient border-transparent text-white' : ''}`}
              >
                <Plus className="size-4" aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${baseId}-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p
                    className={`pb-7 pr-12 leading-relaxed ${light ? 'text-abyss-900/65' : 'text-white/65'}`}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
