export type TErrorSources = {
  path: number | string;
  message: string;
}[];

export type TGenericError = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
