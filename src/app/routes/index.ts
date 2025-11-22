import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";

export const rootRoute = Router();

const moduleRoutes = [
  {
    path: "/auth",
    element: authRoutes,
  },
];

moduleRoutes.forEach((x) => rootRoute.use(x.path, x.element));
