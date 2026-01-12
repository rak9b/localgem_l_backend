"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        itinerary: zod_1.z.string(),
        city: zod_1.z.string(),
        country: zod_1.z.string(),
        category: zod_1.z.string(),
        images: zod_1.z.array(zod_1.z.string()),
        price: zod_1.z.number(),
        duration: zod_1.z.string(),
        meetingPoint: zod_1.z.string(),
        maxGroupSize: zod_1.z.number(),
        languages: zod_1.z.array(zod_1.z.string()),
        guideId: zod_1.z.string(),
        coordinateX: zod_1.z.number().optional(),
        coordinateY: zod_1.z.number().optional(),
        isFeatured: zod_1.z.boolean().optional(),
    }),
});
exports.TourValidation = {
    create,
};
