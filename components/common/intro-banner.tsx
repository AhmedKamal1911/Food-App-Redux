import BreadCramb from "./bread-cramb";

export default function IntroBanner({
  pageName,
  backgroundSrc,
}: {
  pageName: string;
  backgroundSrc: string;
}) {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundSrc})` }}
      className={`pb-15 pt-30 md:pb-15 md:pt-45  md:h-[400px] bg-cover bg-center relative before:absolute before:inset-0 before:bg-secondary/80`}
    >
      <div className="container">
        <div className="relative flex flex-col items-center gap-5">
          <span className="text-3xl md:text-5xl font-bold text-white uppercase">
            {pageName}
          </span>
          <BreadCramb currentPage={pageName} />
        </div>
      </div>
    </div>
  );
}
