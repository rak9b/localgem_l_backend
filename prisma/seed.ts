import { PrismaClient } from '../prisma/generated-client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const CITIES = [
    { name: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964, timezone: 'Europe/Rome' },
    { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, timezone: 'Asia/Tokyo' },
    { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, timezone: 'Europe/Paris' },
    { name: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734, timezone: 'Europe/Madrid' },
    { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York' },
    { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London' },
    { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lng: 4.9041, timezone: 'Europe/Amsterdam' },
    { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708, timezone: 'Asia/Dubai' },
    { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, timezone: 'Europe/Istanbul' },
    { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney' },
    { name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, timezone: 'Asia/Singapore' },
    { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018, timezone: 'Asia/Bangkok' },
    { name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, timezone: 'Asia/Kolkata' },
    { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332, timezone: 'America/Mexico_City' },
    { name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lng: -58.3816, timezone: 'America/Argentina/Buenos_Aires' },
    { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, timezone: 'Africa/Cairo' },
    { name: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780, timezone: 'Asia/Seoul' },
    { name: 'Hong Kong', country: 'China', lat: 22.3193, lng: 114.1694, timezone: 'Asia/Hong_Kong' },
    { name: 'Lisbon', country: 'Portugal', lat: 38.7223, lng: -9.1393, timezone: 'Europe/Lisbon' },
    { name: 'Prague', country: 'Czech Republic', lat: 50.0755, lng: 14.4378, timezone: 'Europe/Prague' },
    { name: 'Vienna', country: 'Austria', lat: 48.2082, lng: 16.3738, timezone: 'Europe/Vienna' },
    { name: 'Athens', country: 'Greece', lat: 37.9838, lng: 23.7275, timezone: 'Europe/Athens' }
];

const CATEGORIES = [
    'Food & Drink', 'Culture & History', 'Nightlife', 'Adventure & Sports', 'Shopping', 'Nature & Wellness'
];

const TOUR_TEMPLATES = [
    {
        title: 'Hidden Gems of {city}',
        category: 'Culture & History',
        desc: 'Discover the secret spots of {city} that only locals know about. Avoid the tourist traps and experience the authentic culture.',
        priceMin: 40, priceMax: 80,
        images: ['https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800', 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=800']
    },
    {
        title: '{city} Street Food Adventure',
        category: 'Food & Drink',
        desc: 'Taste the best street food {city} has to offer. From savory snacks to sweet treats, we will try it all!',
        priceMin: 50, priceMax: 100,
        images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800']
    },
    {
        title: '{city} by Night: Pubs and Bars',
        category: 'Nightlife',
        desc: 'Experience the vibrant nightlife of {city}. We will visit the coolest bars, pubs, and speakeasies in town.',
        priceMin: 60, priceMax: 120,
        images: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800', 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800']
    },
    {
        title: 'Urban Hiking in {city}',
        category: 'Adventure & Sports',
        desc: 'Get active and explore {city} on foot. We will hike through parks, climb stairs, and enjoy panoramic views.',
        priceMin: 30, priceMax: 60,
        images: ['https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800']
    },
    {
        title: 'Vintage Shopping in {city}',
        category: 'Shopping',
        desc: 'Find unique treasures in the best vintage shops and flea markets of {city}. Perfect for fashion lovers!',
        priceMin: 45, priceMax: 90,
        images: ['https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800']
    },
    {
        title: '{city} Wellness Retreat',
        category: 'Nature & Wellness',
        desc: 'Relax and rejuvenate with a yoga session in the park followed by a healthy brunch.',
        priceMin: 55, priceMax: 110,
        images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800']
    }
];

const GUIDES = [
    { name: 'Elena Rodriguez', email: 'elena@guide.com', location: 'Rome, Italy', bio: 'Passionate about history and food.' },
    { name: 'Kenji Tanaka', email: 'kenji@guide.com', location: 'Tokyo, Japan', bio: 'Expert in Japanese culture and anime.' },
    { name: 'Sophie Dubois', email: 'sophie@guide.com', location: 'Paris, France', bio: 'Art lover and pastry enthusiast.' },
    { name: 'Carlos Martinez', email: 'carlos@guide.com', location: 'Barcelona, Spain', bio: 'Architecture geek and tapas addict.' },
    { name: 'Sarah Johnson', email: 'sarah@guide.com', location: 'New York, USA', bio: 'Urban explorer and photographer.' },
    { name: 'David Smith', email: 'david@guide.com', location: 'London, UK', bio: 'Pub trivia champion and history buff.' },
    { name: 'Anna Mueller', email: 'anna@guide.com', location: 'Berlin, Germany', bio: 'Techno fan and street art expert.' },
    { name: 'Marco Silva', email: 'marco@guide.com', location: 'Lisbon, Portugal', bio: 'Surfer and seafood lover.' },
    { name: 'Priya Patel', email: 'priya@guide.com', location: 'Mumbai, India', bio: 'Bollywood dancer and spice master.' },
    { name: 'Ahmed Hassan', email: 'ahmed@guide.com', location: 'Cairo, Egypt', bio: 'Egyptologist and storyteller.' }
];

async function main() {
    console.log('🌱 Starting massive database seed...');

    // 1. Clear Data
    await prisma.review.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.tour.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Cleared existing data');

    // 2. Create Password Hashes
    const guidePassword = await bcrypt.hash('guide456', 10);
    const touristPassword = await bcrypt.hash('tourist123', 10);
    const adminPassword = await bcrypt.hash('admin789', 10);

    // 3. Create Users
    // Admin
    await prisma.user.create({
        data: {
            email: 'admin@localgems.com', name: 'Admin User', password: adminPassword, role: 'ADMIN',
            bio: 'Platform Administrator', location: 'Headquarters', languages: ['English']
        }
    });

    // Tourist
    const tourist = await prisma.user.create({
        data: {
            email: 'sarah@tourist.com', name: 'Sarah Tourist', password: touristPassword, role: 'USER',
            bio: 'I love traveling!', location: 'New York, USA', languages: ['English', 'Spanish'],
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop'
        }
    });

    // Guides
    const createdGuides = [];
    for (const guide of GUIDES) {
        const created = await prisma.user.create({
            data: {
                email: guide.email, name: guide.name, password: guidePassword, role: 'GUIDE',
                bio: guide.bio, location: guide.location, languages: ['English', 'Spanish'], // Simplified
                avatar: `https://ui-avatars.com/api/?name=${guide.name.replace(' ', '+')}&background=random`
            }
        });
        createdGuides.push(created);
    }
    console.log(`✅ Created ${createdGuides.length} guides`);

    // 4. Create Tours
    let tourCount = 0;
    const allTours = [];

    for (const city of CITIES) {
        // Pick 4-6 random templates for this city
        const numTours = Math.floor(Math.random() * 3) + 4; // 4 to 6
        const cityTemplates = [...TOUR_TEMPLATES].sort(() => 0.5 - Math.random()).slice(0, numTours);

        for (const template of cityTemplates) {
            const guide = createdGuides[Math.floor(Math.random() * createdGuides.length)];
            const price = Math.floor(Math.random() * (template.priceMax - template.priceMin + 1)) + template.priceMin;
            const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1); // 4.0 to 5.0

            // Add some jitter to coordinates
            const lat = city.lat + (Math.random() - 0.5) * 0.05;
            const lng = city.lng + (Math.random() - 0.5) * 0.05;

            const tour = await prisma.tour.create({
                data: {
                    title: template.title.replace('{city}', city.name),
                    description: template.desc.replace('{city}', city.name) + ` Join us for an unforgettable experience in ${city.country}.`,
                    itinerary: `Meeting Point → Activity 1 → Activity 2 → Local Meal → End of Tour`,
                    city: city.name,
                    country: city.country,
                    category: template.category,
                    images: template.images,
                    price: price,
                    duration: `${Math.floor(Math.random() * 4) + 2} hours`,
                    meetingPoint: `Central ${city.name} Station`,
                    maxGroupSize: Math.floor(Math.random() * 10) + 4,
                    languages: ['English'],
                    coordinateX: lat,
                    coordinateY: lng,
                    rating: parseFloat(rating),
                    isFeatured: Math.random() > 0.8, // 20% featured
                    guideId: guide.id
                }
            });
            allTours.push(tour);
            tourCount++;
        }
    }
    console.log(`✅ Created ${tourCount} tours across ${CITIES.length} cities`);

    // 5. Create Bookings & Reviews
    // Create bookings for the tourist
    for (let i = 0; i < 30; i++) {
        const randomTour = allTours[Math.floor(Math.random() * allTours.length)];
        const status = Math.random() > 0.2 ? 'CONFIRMED' : 'PENDING';

        const booking = await prisma.booking.create({
            data: {
                userId: tourist.id,
                tourId: randomTour.id,
                bookingDate: new Date(), // Booked now
                tourDate: new Date(Date.now() + Math.random() * 10000000000), // Future Tour Date
                status: status as any,
                totalAmount: randomTour.price * 2,
                guests: 2,
                paymentStatus: status === 'CONFIRMED' ? 'PAID' : 'UNPAID',
                specialRequirements: 'None',
                contactPhone: '1234567890'
            }
        });

        // Add review for some past bookings (simulated)
        if (Math.random() > 0.5) {
            await prisma.review.create({
                data: {
                    userId: tourist.id,
                    tourId: randomTour.id,
                    rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
                    comment: `Amazing experience in ${randomTour.city}! Highly recommended.`
                }
            });
        }
    }
    console.log('✅ Created 30 bookings and random reviews');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
