export type SuccessRes<TData = null> = {
  status: "success";
  message: string;
  data?: TData;
};
export type FailedRes = {
  status: "validationError" | "error";
  error: {
    status: number;
    message: string;
  };
};

export type ActionResponse<SuccessData = null> = Promise<
  SuccessRes<SuccessData> | FailedRes
>;
