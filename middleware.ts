import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware() {},
  {
    callbacks: {
      authorized: ({ token }) => {
        return Boolean(token && token.role !== "user");
      },
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };
