import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { messRoutes } from "../modules/mess/mess.routes";

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
];

moduleRoutes.forEach((x) => rootRoute.use(x.path, x.element));
