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
router.post(
  "/add-item/:messId",
  checkAuth([ERole.member]),
  bazarController.addItemToBazar
);
router.put(
  "/update-item/:messId",
  checkAuth([ERole.member]),
  bazarController.updatedBazar
);
router.delete(
  "/delete-item/:messId",
  checkAuth([ERole.member]),
  bazarController.updatedBazar
);
router.post(
  "/change-status/:bazarId",
  checkAuth([ERole.manager]),
  bazarController.changeVerifyOfBazar
);

router.get("/bazar-all/:messId", bazarController.getAllBazarInfoByMess);
router.get("/bazar/:bazarId", bazarController.getABazarInfo);

export const bazarRoutes = router;
