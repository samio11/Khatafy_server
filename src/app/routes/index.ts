import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { messRoutes } from "../modules/mess/mess.routes";
import { bazarRoutes } from "../modules/bazar/bazar.routes";

export const rootRoute = Router();

const moduleRoutes = [
  {
    path: "/auth",
    element: authRoutes,
  },
  {
    path: "/mess",
    element: messRoutes,
  },
  {
    path: "/bazar",
    element: bazarRoutes,
  },
];

moduleRoutes.forEach((x) => rootRoute.use(x.path, x.element));
