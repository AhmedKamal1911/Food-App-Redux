import "server-only";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth";

type SessionError = {
  success: false;
  error: {
    status: number;
    message: string;
  };
};

type SessionSuccess = {
  success: true;
  session: Session;
};
export type SessionResponse = SessionError | SessionSuccess;

export const getCurrentSession = async (): Promise<SessionResponse> => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
      error: {
        status: 401,
        message: "Unauthorized error.",
      },
    };
  }

  return {
    success: true,
    session: session,
  };
};
