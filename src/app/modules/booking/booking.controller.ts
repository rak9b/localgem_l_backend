import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingService.createBooking({
        ...req.body,
        userId: req.user.id
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking created successfully',
        data: result,
    });
});

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingService.getMyBookings(req.user.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result,
    });
});

export const BookingController = {
    createBooking,
    getMyBookings,
};
