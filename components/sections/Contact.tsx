import { Section } from '@/app/components/layout/Section';
import { PrimaryButton } from '@/app/components/ui/buttons';

export type SiteSettings = {
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  hours?: string;
  googleMapsUrl?: string;
};

export function Contact({ settings }: { settings: SiteSettings }) {
  return (
    <Section id="contact" className="py-14 md:py-20">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5">
          <h2 className="font-title text-2xl md:text-4xl">Contact</h2>
          <p className="mt-3 text-white/60">
            “Trouvez nous” géré depuis Sanity (adresse/teléfono/horarios/Maps).
          </p>

          <div className="mt-7 space-y-3 text-white/70">
            {settings.address ? (
              <p>
                <span className="text-white/40">Adresse:</span>{' '}
                {settings.address}
              </p>
            ) : null}
            {settings.city ? (
              <p>
                <span className="text-white/40">Ville:</span> {settings.city}
              </p>
            ) : null}
            {settings.phone ? (
              <p>
                <span className="text-white/40">Téléphone:</span>{' '}
                {settings.phone}
              </p>
            ) : null}
            {settings.email ? (
              <p>
                <span className="text-white/40">Email:</span> {settings.email}
              </p>
            ) : null}
            {settings.hours ? (
              <p>
                <span className="text-white/40">Horaires:</span>{' '}
                {settings.hours}
              </p>
            ) : null}
          </div>

          <div className="mt-7">
            <PrimaryButton href={settings.googleMapsUrl || '#'} target="_blank">
              Itinéraire
            </PrimaryButton>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-white/5 aspect-[16/10] grid place-items-center text-white/40">
            MAP placeholder (iframe luego)
          </div>
        </div>
      </div>
    </Section>
  );
}
