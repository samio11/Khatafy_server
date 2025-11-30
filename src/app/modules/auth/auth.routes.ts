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
router.put(
  "/user/update",
  checkAuth([...Object.values(ERole)]),
  authController.changeUserData
);

router.get(
  "/users",
  checkAuth([ERole.admin, ERole.manager]),
  authController.getAllUser
);
router.get(
  "/user",
  checkAuth([...Object.values(ERole)]),
  authController.getAUser
);
router.get(
  "/admin-state",
  checkAuth([ERole.admin]),
  authController.getAdminState
);
router.get(
  "/admin-user",
  checkAuth([ERole.admin]),
  authController.getAdminUserState
);

export const authRoutes = router;
