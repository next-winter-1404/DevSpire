export const dynamic = "force-static";

import ContactView from "@/modules/main/contact-us/views/ContactView";
import { customMetadataGenerator } from "@/utils/helper/Metadata";

export async function generateMetadata() {
  return customMetadataGenerator({
    title: "ارتباط با ما",
    description: "با ما در ارتباط باشید",
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DevSpire Housing",
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`,
  logo: "https://yoursite.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+989119994444",
    contactType: "customer service",
    areaServed: "IR",
    availableLanguage: "Persian",
  },
  sameAs: ["https://instagram.com/logo", "https://twitter.com/logo"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "خیابان سلمان فارسی کوچه فلان، پلاک ۱",
    addressLocality: "ساری",
    addressCountry: "IR",
  },
};

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactView />
    </>
  );
}
