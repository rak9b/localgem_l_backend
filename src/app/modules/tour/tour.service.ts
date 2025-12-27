import prisma from '../../shared/prisma';
import { ITour } from './tour.interface';

const createTour = async (payload: ITour) => {
    const result = await prisma.tour.create({
        data: payload,
    });
    return result;
};

const getAllTours = async (
    filters: any,
    options: any
) => {
    const { search, minPrice, maxPrice, ...filterData } = filters;
    const { page = 1, limit = 10, sortBy, sortOrder } = options;

    const andConditions: any[] = [];

    // Search condition
    if (search) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    city: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ],
        });
    }

    // Price range condition
    if (minPrice !== undefined || maxPrice !== undefined) {
        andConditions.push({
            price: {
                gte: minPrice ? parseFloat(minPrice) : undefined,
                lte: maxPrice ? parseFloat(maxPrice) : undefined,
            },
        });
    }

    // Other exact match filters (city, country, category, etc.)
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key],
                    mode: 'insensitive',
                },
            })),
        });
    }

    const whereConditions: any = andConditions.length > 0 ? { AND: andConditions } : {};

    // Pagination calculation
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Sorting
    const orderBy = {};
    if (sortBy && sortOrder) {
        (orderBy as any)[sortBy] = sortOrder;
    } else {
        (orderBy as any)['createdAt'] = 'desc';
    }

    // @ts-ignore
    const result = await prisma.tour.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy,
        include: {
            reviews: {
                include: {
                    user: true,
                },
            },
            guide: true,
        },
    });

    // @ts-ignore
    const total = await prisma.tour.count({
        where: whereConditions,
    });

    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPage: Math.ceil(total / Number(limit))
        },
        data: result
    };
};

const getSingleTour = async (id: string) => {
    // @ts-ignore
    const result = await prisma.tour.findUnique({
        where: {
            id,
        },
        include: {
            reviews: {
                include: {
                    user: true,
                },
            },
            guide: true,
        },
    });
    return result;
};

export const TourService = {
    createTour,
    getAllTours,
    getSingleTour,
};
