import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { TourService } from './tour.service';

const createTour = catchAsync(async (req: Request, res: Response) => {
    const result = await TourService.createTour(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Tour created successfully!',
        data: result,
    });
});

const getAllTours = catchAsync(async (req: Request, res: Response) => {
    // Pick specific filter fields
    const filters = {
        search: req.query.search,
        city: req.query.city,
        country: req.query.country,
        category: req.query.category,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
    };

    // Pick pagination and sorting options
    const options = {
        page: req.query.page,
        limit: req.query.limit,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder,
    };

    // Clean up undefined filters
    const validFilters: any = {};
    Object.keys(filters).forEach(key => {
        if ((filters as any)[key]) validFilters[key] = (filters as any)[key];
    });

    const result = await TourService.getAllTours(validFilters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Tours fetched successfully!',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleTour = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TourService.getSingleTour(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Tour fetched successfully!',
        data: result,
    });
});

export const TourController = {
    createTour,
    getAllTours,
    getSingleTour,
};
