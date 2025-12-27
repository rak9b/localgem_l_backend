"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createPaymentIntent = async (bookingId) => {
    const booking = await prisma_1.default.booking.findUnique({
        where: { id: bookingId },
    });
    if (!booking) {
        throw new Error('Booking not found');
    }
    // Mock Stripe implementation for now
    return {
        clientSecret: 'mock_secret_' + Math.random().toString(36).substring(7),
    };
};
exports.PaymentService = {
    createPaymentIntent,
};
