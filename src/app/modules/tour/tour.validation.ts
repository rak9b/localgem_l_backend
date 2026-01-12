import { z } from 'zod';

const create = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        itinerary: z.string(),
        city: z.string(),
        country: z.string(),
        category: z.string(),
        images: z.array(z.string()),
        price: z.number(),
        duration: z.string(),
        meetingPoint: z.string(),
        maxGroupSize: z.number(),
        languages: z.array(z.string()),
        guideId: z.string(),
        coordinateX: z.number().optional(),
        coordinateY: z.number().optional(),
        isFeatured: z.boolean().optional(),
    }),
});

export const TourValidation = {
    create,
};
