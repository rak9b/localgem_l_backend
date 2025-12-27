"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createBooking = async (payload) => {
    const result = await prisma_1.default.booking.create({
        data: {
            ...payload,
            tourDate: new Date(payload.tourDate),
            status: 'PENDING',
            paymentStatus: 'UNPAID',
        },
    });
    return result;
};
const getMyBookings = async (userId) => {
    const result = await prisma_1.default.booking.findMany({
        where: {
            userId,
        },
        include: {
            tour: true,
        },
    });
    return result;
};
exports.BookingService = {
    createBooking,
    getMyBookings,
};
