import ReservationForm from "@/components/common/forms/reservation-form";
import IntroBanner from "@/components/common/intro-banner";
import SpecialHeading from "@/components/common/special-heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservation",
  description:
    "Book your table at Pizzon for a delightful dining experience. Reserve online and enjoy fresh pizzas, pasta, and more served hot and on time.",
  openGraph: {
    title: "Reservation | Pizzon Food Delivery",
    description:
      "Reserve your table at Pizzon for fresh, delicious meals and a welcoming atmosphere. Book online today for the perfect dining experience.",
  },
};

export default function ReservationPage() {
  return (
    <main>
      <IntroBanner
        breadcrumbPaths={[{ name: "reservation", href: "/reservation/" }]}
        title="Reservation"
      />
      <section
        className={
          "min-h-[80vh] py-20 bg-[url('/images/decorations/ingredients.jpg')] bg-cover bg-no-repeat bg-center"
        }
      >
        <div className="container">
          <SpecialHeading
            title="make online reservation"
            subTitle="book a table"
          />
          <div className="mt-15">
            <ReservationForm />
          </div>
        </div>
      </section>
    </main>
  );
}
