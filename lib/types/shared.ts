export type SuccessRes = {
  success: true;
  data: {
    status: number;
    message: string;
  };
};

export type FailedRes = {
  success: false;
  error: {
    status: number;
    message: string;
  };
};

export type ActionResponse = Promise<SuccessRes | FailedRes>;
