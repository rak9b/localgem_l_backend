import express from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
    '/',
    auth('USER', 'ADMIN'),
    BookingController.createBooking
);

router.get(
    '/my-bookings',
    auth('USER', 'GUIDE', 'ADMIN'),
    BookingController.getMyBookings
);

export const BookingRoutes = router;
