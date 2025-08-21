import { ReactNode } from "react";
import "server-only";
type Props<T> = {
  promise: Promise<T>;
  children: (data: T) => ReactNode;
};
export default async function Awaited<T>({ children, promise }: Props<T>) {
  const fetcherData = await promise;
  return children(fetcherData);
}
