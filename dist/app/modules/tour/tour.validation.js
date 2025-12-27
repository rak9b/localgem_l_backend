"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        location: zod_1.z.string(),
        price: zod_1.z.number(),
        duration: zod_1.z.string(),
        image: zod_1.z.string(),
        isFeatured: zod_1.z.boolean().optional(),
    }),
});
exports.TourValidation = {
    create,
};
