import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { services } from '@data/data/services';
import { SelectField, TextArea, TextField } from '@data/components/ui/Field';
import { Button } from '@data/components/ui/Button';
import { EASE } from '@data/lib/motion';

type Status = 'idle' | 'submitting' | 'sent';
type Errors = Partial<Record<'name' | 'email' | 'message' | 'consent', string>>;

const serviceOptions = services.map((s) => s.title);

/**
 * Contact form. Fields mirror the live site's form exactly.
 *
 * Frontend only: submission is validated client-side and then resolved against
 * a mock so the success state is reviewable. Point `submit()` at the real
 * endpoint to go live — nothing else needs to change.
 */
async function submit(_data: Record<string, FormDataEntryValue>): Promise<void> {
  await new Promise((r) => setTimeout(r, 900));
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const next: Errors = {};
    if (!String(data.name ?? '').trim()) next.name = 'Please tell us your name.';
    if (!/^\S+@\S+\.\S+$/.test(String(data.email ?? ''))) next.email = 'Enter a valid email address.';
    if (String(data.message ?? '').trim().length < 10) next.message = 'A little more detail helps us route your enquiry.';
    if (!data.consent) next.consent = 'Please accept the privacy policy to continue.';

    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setStatus('submitting');
    await submit(data);
    setStatus('sent');
    form.reset();
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col items-start gap-6 rounded-2xl border border-brand-green/30 bg-ink-800/60 p-10 lg:p-14"
            role="status"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-brand-green text-ink-900">
              <Check className="size-7" aria-hidden />
            </span>
            <h3 className="text-h3">Message received.</h3>
            <p className="max-w-md text-paper/55">
              Thank you for reaching out. A member of the Rothian Data team will be in touch
              shortly.
            </p>
            <Button variant="outline" onClick={() => setStatus('idle')}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Name" name="name" autoComplete="name" required error={errors.name} />
              <TextField
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email}
              />
              <TextField label="Phone number" name="phone" type="tel" autoComplete="tel" />
              <TextField label="Project Name" name="project" />
            </div>

            <SelectField
              label="What Service Can We Help You With?"
              name="service"
              options={serviceOptions}
            />

            <TextArea label="Message" name="message" required rows={6} error={errors.message} />

            <div>
              <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-paper/55">
                <input
                  type="checkbox"
                  name="consent"
                  className="mt-1 size-4 shrink-0 appearance-none rounded border border-ink-700 bg-ink-800 transition-colors checked:border-brand-green checked:bg-brand-green focus-visible:outline-2 focus-visible:outline-brand-green"
                  aria-invalid={!!errors.consent}
                />
                <span>
                  I am bound by the terms of the Service. I accept the Privacy Policy.
                </span>
              </label>
              {errors.consent && (
                <p role="alert" className="mt-2 text-sm text-red-400">
                  {errors.consent}
                </p>
              )}
            </div>

            <div className="mt-3">
              <Button type="submit" size="lg" disabled={status === 'submitting'} arrow>
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
