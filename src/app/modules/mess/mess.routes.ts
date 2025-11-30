import { Router } from "express";

import { ERole } from "../user/user.interface";
import { messController } from "./mess.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post("/create", checkAuth([ERole.admin]), messController.createMess);
router.post(
  "/invite/:messId",
  checkAuth([ERole.admin, ERole.manager]),
  messController.invitedUserToMess
);
router.post(
  "/shift-manager/:messId",
  checkAuth([ERole.manager]),
  messController.shiftManagerRole
);
router.get(
  "/",
  checkAuth([ERole.admin, ERole.manager]),
  messController.getAllMess
);
router.get("/:id", messController.getAMessData);

router.patch(
  "/update/:messId",
  checkAuth([ERole.manager]),
  messController.updateMessData
);
router.delete(
  "/delete/:messId",
  checkAuth([ERole.manager]),
  messController.deleteMessData
);

router.post(
  "/remove-member-mess",
  checkAuth([ERole.manager]),
  messController.removeMemberFromMess
);

router.get(
  "/manager/state",
  checkAuth([ERole.manager]),
  messController.getManagerState
);

export const messRoutes = router;
