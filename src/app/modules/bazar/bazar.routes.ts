import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";
import { bazarController } from "./bazar.controller";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/create/:messId",
  checkAuth([ERole.member]),
  multerUpload.single("file"),
  bazarController.createBazar
);

export const bazarRoutes = router;
