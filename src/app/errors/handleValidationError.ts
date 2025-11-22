import mongoose from "mongoose";
import { TErrorSources, TGenericError } from "../types/error";

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericError => {
  const errorSources: TErrorSources = Object.values(err?.errors).map((x) => {
    return {
      path: x.path,
      message: x.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};
