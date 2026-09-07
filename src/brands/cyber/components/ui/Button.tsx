import { ArrowUpRight } from 'lucide-react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'gradient' | 'outline' | 'ghost' | 'light' | 'alert'
type Size = 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  withArrow?: boolean
  children: ReactNode
  className?: string
}

type ButtonProps = BaseProps &
  (
    | ({ to: string; href?: never } & Omit<ComponentPropsWithoutRef<typeof Link>, 'to' | 'className'>)
    | ({ href: string; to?: never } & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className'>)
    | ({ to?: never; href?: never } & Omit<ComponentPropsWithoutRef<'button'>, 'className'>)
  )

const variantClasses: Record<Variant, string> = {
  gradient:
    'bg-brand-gradient text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] hover:shadow-[0_12px_40px_-6px_rgba(45,212,238,0.55)] hover:scale-[1.03] active:scale-[0.98]',
  outline:
    'border border-white/25 text-white hover:border-brand-cyan hover:text-brand-cyan',
  ghost: 'text-white hover:text-brand-cyan',
  light:
    'bg-white text-abyss-900 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.4)] hover:scale-[1.03] active:scale-[0.98]',
  alert:
    'bg-brand-alert text-white shadow-[0_8px_30px_-8px_rgba(242,41,91,0.55)] hover:shadow-[0_12px_40px_-6px_rgba(242,41,91,0.65)] hover:scale-[1.03] active:scale-[0.98]',
}

const sizeClasses: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

/** Pill CTA — the Rothian signature rounded-full button, in Cyber's violet→cyan gradient. */
export function Button({
  variant = 'gradient',
  size = 'md',
  withArrow = false,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = `group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium font-display transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-violet ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          aria-hidden
        />
      )}
    </>
  )

  if ('to' in rest && rest.to) {
    const { to, ...linkRest } = rest as Extract<ButtonProps, { to: string }>
    return (
      <Link to={to} className={classes} {...linkRest}>
        {content}
      </Link>
    )
  }
  if ('href' in rest && rest.href) {
    const { href, ...aRest } = rest as Extract<ButtonProps, { href: string }>
    return (
      <a href={href} className={classes} {...aRest}>
        {content}
      </a>
    )
  }
  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<'button'>)}>
      {content}
    </button>
  )
}
