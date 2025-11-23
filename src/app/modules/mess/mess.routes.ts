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
router.get("/:id", messController.getAMessData);

export const messRoutes = router;
