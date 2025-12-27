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
export type ITourFilters = {
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    city?: string;
    country?: string;
    category?: string;
    [key: string]: any;
};

export type ITourOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};
