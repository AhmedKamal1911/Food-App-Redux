import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export default function BreadCramb({ currentPage }: { currentPage: string }) {
  return (
    <Breadcrumb className="">
      <BreadcrumbList className="text-white capitalize text-[17px] sm:text-[19px]">
        <BreadcrumbItem>
          <BreadcrumbLink className="hover:text-primary" href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-white">{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
