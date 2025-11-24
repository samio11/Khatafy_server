"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRoute = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const mess_routes_1 = require("../modules/mess/mess.routes");
const bazar_routes_1 = require("../modules/bazar/bazar.routes");
exports.rootRoute = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        element: auth_routes_1.authRoutes,
    },
    {
        path: "/mess",
        element: mess_routes_1.messRoutes,
    },
    {
        path: "/bazar",
        element: bazar_routes_1.bazarRoutes,
    },
];
moduleRoutes.forEach((x) => exports.rootRoute.use(x.path, x.element));
