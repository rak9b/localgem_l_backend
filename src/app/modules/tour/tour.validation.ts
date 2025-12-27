import { z } from 'zod';

const create = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        location: z.string(),
        price: z.number(),
        duration: z.string(),
        image: z.string(),
        isFeatured: z.boolean().optional(),
    }),
});

export const TourValidation = {
    create,
};
