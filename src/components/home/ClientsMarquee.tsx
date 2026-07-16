import { CLIENTS } from '../../data/clients'
import { Marquee } from '../ui/Marquee'
import { Reveal } from '../ui/Reveal'

/** Trust strip — partner logos from the live site, doubled for a seamless marquee. */
export function ClientsMarquee() {
  const row = [...CLIENTS, ...CLIENTS, ...CLIENTS]
  return (
    <section className="border-b border-ink-900/5 bg-paper py-14" aria-label="Partners and clients">
      <div className="container-site">
        <Reveal as="p" className="eyebrow mb-8 text-center text-ink-900/40">
          Trusted by teams who build serious things
        </Reveal>
      </div>
      <Marquee>
        {row.map((client, i) => (
          <img
            key={`${client.name}-${i}`}
            src={client.logo}
            alt={client.name}
            loading="lazy"
            className="mx-10 h-9 w-auto opacity-55 grayscale transition-opacity hover:opacity-100 hover:grayscale-0 sm:mx-14 sm:h-10"
            height={40}
          />
        ))}
      </Marquee>
    </section>
  )
}
