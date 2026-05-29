import SectionHeading from "@/components/section-heading";
import { BRAND_INFO } from "@/lib/site-content";

export default function ContactPage() {
  return (
    <div className="flex-1 bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <SectionHeading
          title="Contact the Studio"
          subtitle="Let's align on your writing, workshops, story worlds, or human-centred AI experiments."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="space-y-6 md:col-span-1">
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-hjc-black mb-1">Email</h3>
              <p className="text-sm font-mono text-hjc-charcoal hover:text-hjc-aged-gold">
                <a href={`mailto:${BRAND_INFO.email}`}>{BRAND_INFO.email}</a>
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-hjc-black mb-1">Phone</h3>
              <p className="text-sm font-mono text-hjc-charcoal">
                {BRAND_INFO.phone}
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-hjc-black mb-1">Location</h3>
              <p className="text-sm text-hjc-charcoal">
                {BRAND_INFO.address}
              </p>
            </div>
            <div className="pt-4 border-t border-hjc-charcoal/10">
              <p className="text-xs text-hjc-charcoal/60 leading-relaxed font-mono">
                Consultations are held by arrangement. Based in Aotearoa New Zealand.
              </p>
            </div>
          </div>

          {/* Form Placeholder */}
          <div className="md:col-span-2 border border-hjc-charcoal p-6 bg-hjc-warm-white">
            <h3 className="text-sm font-bold uppercase tracking-wider text-hjc-black mb-4">Send a Message</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider font-semibold text-hjc-black mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-hjc-charcoal/30 bg-white focus:outline-none focus:border-hjc-yellow text-sm"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider font-semibold text-hjc-black mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-hjc-charcoal/30 bg-white focus:outline-none focus:border-hjc-yellow text-sm"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-xs uppercase tracking-wider font-semibold text-hjc-black mb-1">
                  Area of Interest
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  className="w-full px-3 py-2 border border-hjc-charcoal/30 bg-white focus:outline-none focus:border-hjc-yellow text-sm"
                >
                  <option value="workshops">Writing Workshops</option>
                  <option value="legacy">Legacy Story Services</option>
                  <option value="myth">Personal Myth Authoring</option>
                  <option value="experiments">Human-Centred AI Experiments</option>
                  <option value="other">General inquiry</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider font-semibold text-hjc-black mb-1">
                  Message Context
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="How can we help turn your memory, experience, or imagination into story?"
                  className="w-full px-3 py-2 border border-hjc-charcoal/30 bg-white focus:outline-none focus:border-hjc-yellow text-sm"
                />
              </div>
              <button
                type="button"
                className="w-full px-6 py-3 text-xs uppercase tracking-widest font-semibold bg-hjc-black text-hjc-warm-white border border-hjc-black hover:bg-hjc-yellow hover:text-hjc-black transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
