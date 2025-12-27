import prisma from '../../shared/prisma';

const createBooking = async (payload: {
    userId: string;
    tourId: string;
    totalAmount: number;
    tourDate: string;
    guests: number;
    specialRequirements?: string;
    contactPhone?: string;
}) => {
    const result = await prisma.booking.create({
        data: {
            ...payload,
            tourDate: new Date(payload.tourDate),
            status: 'PENDING',
            paymentStatus: 'UNPAID',
        },
    });
    return result;
};

const getMyBookings = async (userId: string) => {
    const result = await prisma.booking.findMany({
        where: {
            userId,
        },
        include: {
            tour: true,
        },
    });
    return result;
};

export const BookingService = {
    createBooking,
    getMyBookings,
};
