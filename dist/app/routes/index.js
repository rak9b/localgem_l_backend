"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const tour_routes_1 = require("../modules/tour/tour.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/tours',
        route: tour_routes_1.TourRoutes,
    },
    {
        path: '/bookings',
        route: booking_routes_1.BookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
