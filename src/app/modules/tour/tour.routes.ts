import { Router } from 'express';
import { TourController } from './tour.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TourValidation } from './tour.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', TourController.getAllTours);
router.get('/:id', TourController.getSingleTour);

router.post(
    '/',
    auth('ADMIN'),
    validateRequest(TourValidation.create),
    TourController.createTour
);

export const TourRoutes = router;
