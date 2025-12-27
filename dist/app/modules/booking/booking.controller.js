"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.default)(async (req, res) => {
    const result = await booking_service_1.BookingService.createBooking({
        ...req.body,
        userId: req.user.id
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Booking created successfully',
        data: result,
    });
});
const getMyBookings = (0, catchAsync_1.default)(async (req, res) => {
    const result = await booking_service_1.BookingService.getMyBookings(req.user.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result,
    });
});
exports.BookingController = {
    createBooking,
    getMyBookings,
};
