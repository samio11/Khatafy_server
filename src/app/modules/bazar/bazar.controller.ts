import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bazarServices } from "./bazar.services";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createBazar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { messId } = req?.params;
    const { id } = req?.user as JwtPayload;
    const payload = {
      ...JSON.parse(req?.body?.data),
      proof: req?.file?.path,
      mess: messId,
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
const getAllBazarInfoByMess = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { messId } = req?.params;
    const result = await bazarServices.getAllBazarInfoByMess(messId);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Getting All Bazar Item",
      data: result,
    });
  }
);
const getABazarInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bazarId } = req?.params;
    const result = await bazarServices.getABazarInfo(bazarId);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Getting A Bazar Info",
      data: result,
    });
  }
);
const addItemToBazar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req?.user as JwtPayload;
    const { messId } = req?.params;
    const payload = req?.body;
    const result = await bazarServices.addItemToBazar(payload, id, messId);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "New Item added to Bazar",
      data: result,
    });
  }
);
const updatedBazar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req?.user as JwtPayload;
    const { messId } = req?.params;
    const payload = req?.body;
    const result = await bazarServices.updatedBazar(payload, id, messId);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Update Bazar item",
      data: result,
    });
  }
);
const deleteBazar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { messId } = req?.params;
    const { id } = req?.user as JwtPayload;
    const result = await bazarServices.deleteBazar(messId, id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Delete Bazar",
      data: result,
    });
  }
);
const changeVerifyOfBazar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bazarId } = req?.params;
    const { id } = req?.user as JwtPayload;
    const result = await bazarServices.changeVerifyOfBazar(bazarId, id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Bazar Status Changed",
      data: result,
    });
  }
);
const getAllBazar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req?.query;
    const result = await bazarServices.getAllBazar(
      query as Record<string, string>
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Bazar Data Getted",
      data: result,
    });
  }
);
const getBazarsByManager = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req?.user as JwtPayload;
    const result = await bazarServices.getBazarsByManager(id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Bazar Data Getted for manager",
      data: result,
    });
  }
);
const getAllBazarForMember = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req?.query || "";
    const { id } = req?.user as JwtPayload;
    const result = await bazarServices.getAllBazarForMember(
      query as Record<string, string>,
      id
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Bazar Data Getted for Member",
      data: result,
    });
  }
);

export const bazarController = {
  createBazar,
  getAllBazarInfoByMess,
  getABazarInfo,
  addItemToBazar,
  updatedBazar,
  deleteBazar,
  changeVerifyOfBazar,
  getAllBazar,
  getBazarsByManager,
  getAllBazarForMember,
};
