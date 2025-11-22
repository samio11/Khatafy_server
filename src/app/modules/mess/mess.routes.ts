import { Router } from "express";

import { ERole } from "../user/user.interface";
import { messController } from "./mess.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post("/create", checkAuth([ERole.admin]), messController.createMess);
router.get("/:id", messController.getAMessData);

export const messRoutes = router;
