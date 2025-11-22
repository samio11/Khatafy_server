"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRoute = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
exports.rootRoute = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        element: auth_routes_1.authRoutes,
    },
];
moduleRoutes.forEach((x) => exports.rootRoute.use(x.path, x.element));
