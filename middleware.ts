import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware() {
    console.log("Middleware nextauth");
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("Token:", {
          canAccessDashboard: Boolean(token && token.role !== "user"),
          token,
        });
        return Boolean(token && token.role !== "user");
      },
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };
