"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const tour_service_1 = require("./tour.service");
const createTour = (0, catchAsync_1.default)(async (req, res) => {
    const result = await tour_service_1.TourService.createTour(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tour created successfully!',
        data: result,
    });
});
const getAllTours = (0, catchAsync_1.default)(async (req, res) => {
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
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder,
    };
    // Clean up undefined filters
    const validFilters = {};
    Object.keys(filters).forEach(key => {
        if (filters[key])
            validFilters[key] = filters[key];
    });
    const result = await tour_service_1.TourService.getAllTours(validFilters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tours fetched successfully!',
        meta: result.meta,
        data: result.data,
    });
});
const getSingleTour = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await tour_service_1.TourService.getSingleTour(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tour fetched successfully!',
        data: result,
    });
});
exports.TourController = {
    createTour,
    getAllTours,
    getSingleTour,
};
