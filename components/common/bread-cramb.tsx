import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  // BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export default function BreadCramb({
  // currentPage,
  pathes,
}: {
  // currentPage: string;
  pathes: { name: string; href?: string }[];
}) {
  return (
    <Breadcrumb className="">
      <BreadcrumbList className="text-white capitalize text-[17px] sm:text-[19px]">
        <BreadcrumbItem>
          <BreadcrumbLink className="hover:text-primary" href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathes.map((path, index) => (
          <Fragment key={index}>
            <BreadcrumbSeparator />
            {pathes.length - 1 === index ? (
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  {path.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="hover:text-primary"
                  href={path.href ?? "#"}
                >
                  {path.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
