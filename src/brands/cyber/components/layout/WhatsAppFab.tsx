import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { CONTACT } from '../../lib/nav'

/** Floating WhatsApp chat button — preserved from the current site. */
export function WhatsAppFab() {
  return (
    <motion.a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-brand-gradient text-white shadow-[0_10px_30px_-6px_rgba(139,92,246,0.6)]"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="size-6" aria-hidden />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-violet/40 [animation-duration:2.5s]" aria-hidden />
    </motion.a>
  )
}
