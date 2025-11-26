import { Router } from "express";
import { authController } from "./auth.controller";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";

const router = Router();

router.post("/login", authController.userLogin);
router.post("/logout", authController.userLogout);
router.post(
  "/register",
  multerUpload.single("file"),
  authController.userRegister
);

router.post("/kick/:userId", checkAuth([ERole.admin]), authController.kickUser);
router.post(
  "/un-kick/:userId",
  checkAuth([ERole.admin]),
  authController.unKickUser
);
router.post(
  "/assign-manager/:userId",
  checkAuth([ERole.admin]),
  authController.changeStatusToManager
);

router.get("/users", checkAuth([ERole.admin]), authController.getAllUser);
router.get(
  "/user",
  checkAuth([...Object.values(ERole)]),
  authController.getAUser
);

export const authRoutes = router;
