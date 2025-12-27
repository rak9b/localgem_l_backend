"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourRoutes = void 0;
const express_1 = require("express");
const tour_controller_1 = require("./tour.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const tour_validation_1 = require("./tour.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.get('/', tour_controller_1.TourController.getAllTours);
router.get('/:id', tour_controller_1.TourController.getSingleTour);
router.post('/', (0, auth_1.default)('ADMIN'), (0, validateRequest_1.default)(tour_validation_1.TourValidation.create), tour_controller_1.TourController.createTour);
exports.TourRoutes = router;
