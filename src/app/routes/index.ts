import { Router } from 'express';

import { AuthRoutes } from '../modules/auth/auth.routes';
import { TourRoutes } from '../modules/tour/tour.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';

const router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/tours',
        route: TourRoutes,
    },
    {
        path: '/bookings',
        route: BookingRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
