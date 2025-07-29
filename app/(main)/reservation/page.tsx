import ReservationForm from "@/components/common/forms/reservation-form";
import IntroBanner from "@/components/common/intro-banner";
import SpecialHeading from "@/components/common/special-heading";

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
