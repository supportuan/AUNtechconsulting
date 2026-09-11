import { useState, type FormEvent } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { number: '01', label: 'ApplyUniNow', href: 'https://applyuninow.com/', font: 'font-poppins' },
  { number: '02', label: 'ApplyUniLoans', href: 'https://applyuniloans.com/', font: 'font-poppins' },
  { number: '03', label: 'ApplyUniHomes', href: 'https://applyunihomes.com/', font: 'font-comfortaa' },
  { number: '04', label: 'ApplyUniJobs', href: 'https://applyunijobs.com/', font: 'font-comfortaa' },
] as const;

const NAV_DELAYS = [350, 450, 550, 650];

const WHATSAPP_NUMBER = '447734566688';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function buildWhatsAppMessageUrl(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function WhatsAppLink({ className = '' }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-[6px] no-underline text-white hover:text-[#25D366] transition-colors ${className}`}
    >
      <WhatsAppIcon className="w-[15px] h-[15px] text-[#25D366] shrink-0" />
      <span className="font-manrope text-[13px] leading-[15.6px]">Whatsapp</span>
    </a>
  );
}

function NavItem({
  number,
  label,
  href,
  font,
  delay,
}: {
  number: string;
  label: string;
  href: string;
  font: string;
  delay: number;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-[3px] anim-fade-up no-underline"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="font-manrope text-[#AFDDFF]/80 text-[13px] leading-[15.6px]">{number}.</span>
      <span className={`${font} text-white text-[13px] leading-[15.6px] cursor-pointer hover:text-[#AFDDFF] transition-colors`}>
        {label}
      </span>
    </a>
  );
}

function GridLines() {
  const verticalPositions = ['12.6%', '37.5%', '61.9%', '86.2%'];
  const horizontalPositions = ['32.7%', '71.4%'];

  return (
    <>
      {verticalPositions.map((left, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 h-full w-px bg-white/[0.04] anim-grid-v"
          style={{ left, animationDelay: `${600 + i * 100}ms` }}
        />
      ))}
      {horizontalPositions.map((top, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 w-full h-px bg-white/[0.04] anim-grid-h"
          style={{ top, animationDelay: `${800 + i * 150}ms` }}
        />
      ))}
      {horizontalPositions.map((top, hi) =>
        verticalPositions.map((left, vi) => (
          <div
            key={`plus-${hi}-${vi}`}
            className="absolute anim-scale-in"
            style={{ top, left, animationDelay: `${1000 + (hi * 4 + vi) * 80}ms` }}
          >
            <div className="absolute w-[10px] h-px bg-white/70 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-px h-[10px] bg-white/70 -translate-x-1/2 -translate-y-1/2" />
          </div>
        )),
      )}
    </>
  );
}

const EMPTY_CONTACT = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  message: '',
  agreed: false,
};

const labelClass =
  'font-manrope text-white text-[12px] leading-[15.6px] font-medium tracking-[0.01em]';

const glassInputClass =
  'w-full rounded-[16px] border border-white/15 bg-white/[0.07] text-white font-manrope text-[13px] leading-[15.6px] px-[12px] py-[10px] outline-none placeholder:text-white/45 backdrop-blur-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] focus:border-[#AFDDFF]/60 focus:bg-white/[0.10] focus:shadow-[0_0_0_3px_rgba(175,221,255,0.10),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-200';

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState(EMPTY_CONTACT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const close = () => {
    setForm(EMPTY_CONTACT);
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next.firstName = 'First name is required';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    if (!form.email.trim()) next.email = 'Mail id is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid mail id';
    if (!form.agreed) next.agreed = 'Please agree to the terms and condition';
    setErrors(next);
    if (Object.keys(next).length) return;

    const text = [
      'Hello, I would like to get in touch.',
      '',
      `First name: ${form.firstName.trim()}`,
      `Last name: ${form.lastName.trim() || '—'}`,
      `Phone number: ${form.phone.trim()}`,
      `Mail id: ${form.email.trim()}`,
      `Message: ${form.message.trim() || '—'}`,
    ].join('\n');

    window.open(buildWhatsAppMessageUrl(text), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center px-5 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        open ? 'visible' : 'invisible pointer-events-none'
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={close}
      />
      <div
        className={`relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-[38px] border border-white/20 bg-white/[0.08] backdrop-blur-[28px] backdrop-saturate-[160%] shadow-[0_25px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(255,255,255,0.08)] px-[26px] py-[28px] md:px-[34px] md:py-[32px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[38px] bg-gradient-to-br from-white/[0.16] via-transparent to-[#AFDDFF]/[0.06]" />
        <div className="pointer-events-none absolute -top-[120px] -left-[120px] w-[260px] h-[260px] rounded-full bg-[#AFDDFF]/[0.10] blur-[80px]" />

        <div className="relative z-10">
          <button
            type="button"
            className="absolute top-[-4px] right-[-4px] w-[36px] h-[36px] flex items-center justify-center rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-[12px] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] hover:bg-white/[0.16] hover:border-white/30 transition-all duration-200"
            aria-label="Close contact form"
            onClick={close}
          >
            <X className="w-[18px] h-[18px] text-white" strokeWidth={1.5} />
          </button>

          <h3 className="font-graphik text-white text-[22px] md:text-[28px] leading-[1.1] mb-[24px] pr-[42px] tracking-[-0.02em]">
            We'd love to hear
          </h3>

          {submitted ? (
            <p className="font-manrope text-white text-[14px] leading-[20px] rounded-[20px] bg-white/[0.07] border border-white/15 px-[18px] py-[16px] backdrop-blur-[12px]">
              WhatsApp is opening — please tap Send to deliver your message.
            </p>
          ) : (
            <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit} noValidate>
              <label className="flex flex-col gap-[7px]">
                <span className={labelClass}>
                  First name <span className="text-[#AFDDFF]">*</span>
                </span>
                <input
                  className={glassInputClass}
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="First name"
                />
                {errors.firstName && (
                  <span className="font-manrope text-[#FFB4B4] text-[11px]">{errors.firstName}</span>
                )}
              </label>

              <label className="flex flex-col gap-[7px]">
                <span className={labelClass}>Last name</span>
                <input
                  className={glassInputClass}
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Last name"
                />
              </label>

              <label className="flex flex-col gap-[7px]">
                <span className={labelClass}>
                  Phone number <span className="text-[#AFDDFF]">*</span>
                </span>
                <input
                  className={glassInputClass}
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone number"
                />
                {errors.phone && <span className="font-manrope text-[#FFB4B4] text-[11px]">{errors.phone}</span>}
              </label>

              <label className="flex flex-col gap-[7px]">
                <span className={labelClass}>
                  Mail id <span className="text-[#AFDDFF]">*</span>
                </span>
                <input
                  className={glassInputClass}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Mail id"
                />
                {errors.email && <span className="font-manrope text-[#FFB4B4] text-[11px]">{errors.email}</span>}
              </label>

              <label className="flex flex-col gap-[7px]">
                <span className={labelClass}>Enter the message</span>
                <textarea
                  className={`${glassInputClass} min-h-[100px] resize-none`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Enter the message"
                />
              </label>

              <label className="flex items-start gap-[10px] cursor-pointer mt-[2px]">
                <span className="relative flex items-center justify-center mt-[2px] shrink-0">
                  <input
                    type="checkbox"
                    className="appearance-none w-[16px] h-[16px] rounded-[5px] border border-white/30 bg-white/[0.07] backdrop-blur-[10px] checked:bg-[#AFDDFF] checked:border-[#AFDDFF] transition-all duration-200 cursor-pointer"
                    checked={form.agreed}
                    onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                  />
                  {form.agreed && (
                    <span className="pointer-events-none absolute text-black text-[11px] font-bold leading-none">✓</span>
                  )}
                </span>
                <span className="font-manrope text-white/85 text-[12px] leading-[16px]">
                  I agree to terms and condition <span className="text-[#AFDDFF]">*</span>
                </span>
              </label>
              {errors.agreed && (
                <span className="font-manrope text-[#FFB4B4] text-[11px] -mt-[7px]">{errors.agreed}</span>
              )}

              <button
                type="submit"
                className="mt-[7px] w-full rounded-full border border-white/30 bg-[#AFDDFF] hover:bg-[#c8e8ff] transition-all duration-300 px-[20px] py-[13px] font-manrope text-black text-[13px] leading-[15.6px] font-semibold uppercase tracking-[0.12em] shadow-[0_8px_30px_rgba(175,221,255,0.18),inset_0_1px_0_rgba(255,255,255,0.65)] hover:shadow-[0_10px_35px_rgba(175,221,255,0.30),inset_0_1px_0_rgba(255,255,255,0.75)]"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover anim-fade-in"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_115057_94c3699b-0fd1-4124-bcf3-3626bb8c1f77.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="relative z-10 w-full h-full">
        <nav className="absolute top-0 left-0 w-full flex items-center px-5 md:px-[35px] py-5 md:py-[27px]">
          <div className="flex items-center gap-[40px]">
            <div
              className="text-white text-[18px] md:text-[21px] leading-[21px] whitespace-nowrap anim-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              <span className="font-audiowide font-normal">AUN</span>
              <span className="font-graphik">tech</span>
            </div>
            <div className="hidden lg:flex items-center gap-[40px]">
              {NAV_ITEMS.map((item, i) => (
                <NavItem
                  key={item.number}
                  number={item.number}
                  label={item.label}
                  href={item.href}
                  font={item.font}
                  delay={NAV_DELAYS[i]}
                />
              ))}
            </div>
          </div>

          <div
            className="hidden lg:flex items-center gap-[12px] ml-auto anim-slide-right"
            style={{ animationDelay: '600ms' }}
          >
      
            <WhatsAppLink className="ml-[20px]" />
          </div>

          <button
            type="button"
            className="lg:hidden ml-auto relative w-[40px] h-[40px] flex items-center justify-center anim-fade-in bg-transparent border-0"
            style={{ animationDelay: '400ms' }}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`absolute transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            >
              <Menu className="w-[22px] h-[22px] text-white" strokeWidth={1.5} />
            </span>
            <span
              className={`absolute transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
            >
              <X className="w-[22px] h-[22px] text-white" strokeWidth={1.5} />
            </span>
          </button>
        </nav>

        <div
          className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            menuOpen ? 'visible' : 'invisible'
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMenuOpen(false)}
          />
          <div
            className={`relative h-full flex flex-col px-5 pt-24 pb-10 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <button
              type="button"
              className="absolute top-5 right-5 w-[40px] h-[40px] flex items-center justify-center bg-transparent border-0"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-[22px] h-[22px] text-white" strokeWidth={1.5} />
            </button>

            <div className="flex flex-col gap-8">
              {NAV_ITEMS.map((item, i) => (
                <a
                  key={item.number}
                  href={item.href}
                  className={`flex items-center gap-3 no-underline transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                  }`}
                  style={{ transitionDelay: menuOpen ? `${150 + i * 75}ms` : '0ms' }}
                >
                  <span className="font-manrope text-[#AFDDFF]/80 text-[14px] leading-[1]">{item.number}.</span>
                  <span className={`${item.font} text-white text-[28px] leading-[1.2] tracking-tight`}>{item.label}</span>
                </a>
              ))}
            </div>

            <div
              className={`mt-auto pt-10 border-t border-white/10 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: menuOpen ? '450ms' : '0ms' }}
            >
             
              <div className="flex items-center gap-[8px]">
                <WhatsAppLink />
                
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute top-[140px] sm:top-[160px] md:top-[178px] left-5 md:left-[35px] max-w-[300px] sm:max-w-[420px] md:max-w-[554px] flex flex-col gap-3 md:gap-4 anim-fade-up"
          style={{ animationDelay: '400ms' }}
        >
          <h1 className="font-graphik text-white font-normal leading-[1em] text-[32px] sm:text-[48px] md:text-[68px]">
            The Vision of Engineering is HUMAN + AI.
          </h1>
          <h2 className="font-graphik text-white/80 font-bold leading-[1.3] text-[16px] sm:text-[20px] md:text-[24px]">
            Simplify your 𝘞𝘰𝘳𝘬𝘧𝘭𝘰𝘸 and 𝘚𝘵𝘢𝘺 𝘍𝘰𝘤𝘶𝘴𝘦𝘥.
          </h2>
        </div>

        <GridLines />

        <div className="absolute bottom-5 md:bottom-[35px] left-5 md:left-[35px] right-5 md:right-[35px] flex flex-col md:flex-row items-start md:items-end justify-between gap-5 md:gap-0">
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="bg-[#AFDDFF] px-[16px] md:px-[20px] py-[10px] md:py-[12px] flex items-center gap-[10px] hover:bg-[#c8e8ff] transition-colors anim-fade-up border-0 cursor-pointer"
            style={{ animationDelay: '900ms' }}
          >
            <span className="text-black text-[16px] leading-none">&#10022;</span>
            <span className="font-manrope text-black text-[12px] md:text-[13px] leading-[15.6px] uppercase tracking-wide">
              We'd love to hear.           </span>
          </button>

          <div className="relative max-w-[280px] hidden sm:block anim-slide-right" style={{ animationDelay: '1100ms' }}>
            <span className="font-manrope text-black text-[13px] leading-[15.6px] bg-[#AFDDFF] px-[6px] py-[2px] inline-block mb-[10px]">
              Creating digital Eco-System</span>
            <div className="relative p-[20px]">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 280 168"
                preserveAspectRatio="none"
              >
                <polygon
                  points="0.5,0.5 279.5,0.5 279.5,167.5 30,167.5 0.5,137.5"
                  fill="none"
                  stroke="#AFDDFF"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <p className="relative font-manrope text-white text-[13px] leading-[18px] mb-[18px]">
                Hold up we're Glow-ing up,
                
              </p>
              <p className="relative font-manrope text-white text-[13px] leading-[18px] mb-[18px]">
                
                Page is getting a facelift.
              </p>
              
            </div>
          </div>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
