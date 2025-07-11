import BreadCramb from "./bread-cramb";

export default function IntroBanner({
  title,
  backgroundSrc = "/images/about-page/decoration/about-banner.jpg",
  breadcrumbPaths,
}: {
  title: string;
  backgroundSrc?: string;
  breadcrumbPaths: { name: string; href?: string }[];
}) {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundSrc})` }}
      className={`pb-15 pt-30 md:pb-15 md:pt-45  md:h-[400px] bg-cover bg-center relative before:absolute before:inset-0 before:bg-secondary/80`}
    >
      <div className="container">
        <div className="relative flex flex-col items-center gap-5">
          <span className="max-[300px]:text-xl max-md:text-center text-3xl md:text-5xl font-bold text-white uppercase">
            {title}
          </span>
          <BreadCramb pathes={breadcrumbPaths} />
        </div>
      </div>
    </div>
  );
}
