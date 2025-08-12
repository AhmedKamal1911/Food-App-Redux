import ContactForm from "@/components/common/forms/contact-form";
import IntroBanner from "@/components/common/intro-banner";
import ContactDetailsBox from "./_components/contact-details-box";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach out to Pizzon Food Delivery for orders, feedback, or customer support. We’re here to help you enjoy fresh pizzas and great service.",
  openGraph: {
    title: "Contact Us | Pizzon Food Delivery",
    description:
      "Get in touch with Pizzon for fast order assistance, feedback, and customer care. Your satisfaction is our priority.",
  },
};

export default function ContactPage() {
  return (
    <main>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Your Business Name",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Your Street",
              addressLocality: "Rosetta",
              addressRegion: "Beheira",
              postalCode: "12345",
              addressCountry: "EG",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 31.4010136,
              longitude: 30.4167311,
            },
            url: "https://yourdomain.com/contact",
            telephone: "+20-123-456-789",
          }),
        }}
      /> */}

      <IntroBanner
        title="Contact Us"
        breadcrumbPaths={[{ name: "contact us", href: "/contact/" }]}
      />
      <section className="pt-10">
        <div className="container">
          <div className="flex max-md:flex-col gap-5">
            <ContactDetailsBox />
            <ContactForm />
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33806.44237191941!2d30.4167311!3d31.401013650000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f6894884d8cd2b%3A0x6819963310c9f16b!2sRosetta%2C%20Rasheed%2C%20Rosetta%2C%20Beheira%20Governorate!5e1!3m2!1sen!2seg!4v1743887203402!5m2!1sen!2seg"
          allowFullScreen={true}
          title="Google Map of our location in Rosetta"
          aria-label="Google Map showing our location"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full mt-10 h-[400px] "
        />
      </section>
    </main>
  );
}
