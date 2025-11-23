import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bazarServices } from "./bazar.services";
import { sendResponse } from "../../utils/sendResponse";

const createBazar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { messId } = req?.params;
    const { id } = req?.user;
    const payload = {
      ...JSON.parse(req?.body?.data),
      proof: req?.file?.path,
      addedBy: id,
    };
    const result = await bazarServices.createBazar(payload, messId, id);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Bazar is created",
      data: result,
    });
  }
);

export const bazarController = { createBazar };
