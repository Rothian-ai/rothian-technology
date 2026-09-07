import { useId, type ReactNode } from 'react';
import { cn } from '@data/lib/cn';

interface BaseProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  className?: string;
}

/**
 * Form controls use a persistent mono label rather than a floating one.
 * It matches the eyebrow/label voice used across the site, stays readable at
 * every state (empty, filled, unfocused), and never collides with the value.
 */
const controlBase =
  'w-full rounded-lg border border-ink-700 bg-ink-800/50 px-4 py-3.5 text-paper ' +
  'transition-colors duration-300 placeholder:text-mist/50 ' +
  'focus:border-brand-green/60 focus:outline-none';

function FieldShell({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={id}
        className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mist"
      >
        {label}
        {required && (
          <span className="text-brand-green" aria-hidden>
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  label,
  name,
  required,
  error,
  className,
  type = 'text',
  autoComplete,
}: BaseProps & { type?: 'text' | 'email' | 'tel'; autoComplete?: string }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} error={error} className={className}>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlBase, error && 'border-red-500/60')}
      />
    </FieldShell>
  );
}

export function TextArea({
  label,
  name,
  required,
  error,
  className,
  rows = 5,
}: BaseProps & { rows?: number }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} error={error} className={className}>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlBase, 'resize-none', error && 'border-red-500/60')}
      />
    </FieldShell>
  );
}

export function SelectField({
  label,
  name,
  options,
  required,
  error,
  className,
}: BaseProps & { options: string[] }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} error={error} className={className}>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue=""
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(controlBase, 'appearance-none pr-12', error && 'border-red-500/60')}
        >
          <option value="" disabled>
            Select a service
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-ink-950">
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-5 top-1/2 size-2 -translate-y-2/3 rotate-45 border-b border-r border-mist"
        />
      </div>
    </FieldShell>
  );
}
