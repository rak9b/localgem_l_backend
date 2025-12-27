export type ITour = {
    title: string;
    description: string;
    itinerary: string;
    city: string;
    country: string;
    category: string;
    images: string[];
    price: number;
    duration: string;
    meetingPoint: string;
    maxGroupSize: number;
    languages: string[];
    guideId: string;
    coordinateX?: number;
    coordinateY?: number;
    isFeatured?: boolean;
};
