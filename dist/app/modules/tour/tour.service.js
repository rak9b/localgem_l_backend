"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createTour = async (payload) => {
    const result = await prisma_1.default.tour.create({
        data: payload,
    });
    return result;
};
const getAllTours = async (filters, options) => {
    const { search, minPrice, maxPrice, ...filterData } = filters;
    const { page = 1, limit = 10, sortBy, sortOrder } = options;
    const andConditions = [];
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
                    equals: filterData[key],
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // Pagination calculation
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    // Sorting
    const orderBy = {};
    if (sortBy && sortOrder) {
        orderBy[sortBy] = sortOrder;
    }
    else {
        orderBy['createdAt'] = 'desc';
    }
    const result = await prisma_1.default.tour.findMany({
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
    const total = await prisma_1.default.tour.count({
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
const getSingleTour = async (id) => {
    const result = await prisma_1.default.tour.findUnique({
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
exports.TourService = {
    createTour,
    getAllTours,
    getSingleTour,
};
