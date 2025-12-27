import prisma from '../../shared/prisma';

const createPaymentIntent = async (bookingId: string) => {
    const booking = await prisma.booking.findUnique({
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

export const PaymentService = {
    createPaymentIntent,
};
