import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interface";
import { bazarController } from "./bazar.controller";

const router = Router();

router.post("/create", checkAuth([ERole.member]), bazarController.createBazar);

export const bazarRoutes = router;
