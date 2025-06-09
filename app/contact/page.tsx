import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactInfo } from '@/components/contact/contact-info';
import { ContactHero } from '@/components/contact/contact-hero';

export const metadata: Metadata = {
  title: 'Contact Us | Shahi Pickle',
  description: 'Get in touch with Shahi Pickle. We\'re here to help with your orders, questions, and custom pickle requests.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHero />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}