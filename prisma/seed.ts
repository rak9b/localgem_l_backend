import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const CITIES = [
    { name: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964, timezone: 'Europe/Rome', description: 'The Eternal City, where history lives in every corner.' },
    { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, timezone: 'Asia/Tokyo', description: 'A neon-lit metropolis where tradition meets the future.' },
    { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, timezone: 'Europe/Paris', description: 'The city of light, love, and world-class gastronomy.' },
    { name: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734, timezone: 'Europe/Madrid', description: 'Gaudí masterpieces and sun-soaked Mediterranean vibes.' },
    { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, timezone: 'Asia/Dhaka', description: 'A vibrant, bustling city with rich heritage and incredible street food.' },
    { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York', description: 'The city that never sleeps, a global hub of culture and finance.' },
    { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London', description: 'A historic capital blending royal tradition with modern energy.' },
    { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, timezone: 'Europe/Istanbul', description: 'Where East meets West across the majestic Bosphorus.' },
    { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney', description: 'Iconic harbor views and world-famous beaches.' },
    { name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, timezone: 'Asia/Singapore', description: 'A garden city state with a stunning skyline and culinary diversity.' }
];

const CATEGORIES = [
    'Food & Drink', 'Culture & History', 'Nightlife', 'Adventure & Sports', 'Shopping', 'Nature & Wellness', 'Photography'
];

const TOUR_TEMPLATES = [
    {
        title: 'Hidden Gems of {city}',
        category: 'Culture & History',
        desc: 'Discover the secret spots of {city} that only locals know about. Avoid the tourist traps and experience the authentic culture. We explore backstreets, ancient ruins, and local hangouts.',
        priceMin: 40, priceMax: 80,
        images: ['https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800', 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=800']
    },
    {
        title: '{city} Street Food Adventure',
        category: 'Food & Drink',
        desc: 'Taste the best street food {city} has to offer. From savory snacks to sweet treats, we will try it all! Learn the stories behind the recipes passed down through generations.',
        priceMin: 50, priceMax: 100,
        images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800']
    },
    {
        title: '{city} Photography Walk',
        category: 'Photography',
        desc: 'Capture the soul of {city} through your lens. We visit the most photogenic spots at the perfect time for lighting. Ideal for both pros and amateurs.',
        priceMin: 70, priceMax: 150,
        images: ['https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800']
    },
    {
        title: '{city} by Night: Pubs and Bars',
        category: 'Nightlife',
        desc: 'Experience the vibrant nightlife of {city}. We will visit the coolest bars, pubs, and speakeasies in town, sharing local legends and cocktail secrets.',
        priceMin: 60, priceMax: 120,
        images: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800', 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800']
    },
    {
        title: 'Eco-Hiking in {city}',
        category: 'Nature & Wellness',
        desc: 'Get away from the noise and hike the scenic trails surrounding {city}. We focus on sustainable tourism and local flora/fauna.',
        priceMin: 35, priceMax: 75,
        images: ['https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800']
    }
];

const GUIDES = [
    { name: 'Elena Rodriguez', email: 'elena@guide.com', location: 'Rome, Italy', bio: 'Art historian and former chef. I love showing people the "real" Rome beyond the Colosseum.', lang: ['Italian', 'English', 'Spanish'] },
    { name: 'Kenji Tanaka', email: 'kenji@guide.com', location: 'Tokyo, Japan', bio: 'Tech enthusiast and anime fan. I know every secret arcade and themed cafe in Akihabara.', lang: ['Japanese', 'English'] },
    { name: 'Sayed Ahmed', email: 'sayed@guide.com', location: 'Dhaka, Bangladesh', bio: 'Heritage preservationist and food lover. Let me show you the hidden mosques and best Biryani spots in Old Dhaka.', lang: ['Bengali', 'English', 'Hindi'] },
    { name: 'Sophie Dubois', email: 'sophie@guide.com', location: 'Paris, France', bio: 'Fashion photographer by day, urban explorer by night. I know the best sunset spots in Montmartre.', lang: ['French', 'English'] },
    { name: 'Carlos Silva', email: 'carlos@guide.com', location: 'Barcelona, Spain', bio: 'Architecture student specializing in Gaudí. I make history fun and engaging.', lang: ['Spanish', 'Catalan', 'English'] }
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
                bio: guide.bio, location: guide.location, languages: guide.lang,
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
        // Create at least 6 tours per city for rich data
        const numTours = 6;
        const cityTemplates = [...TOUR_TEMPLATES].sort(() => 0.5 - Math.random());

        for (let i = 0; i < numTours; i++) {
            const template = cityTemplates[i % cityTemplates.length];
            const guide = createdGuides[Math.floor(Math.random() * createdGuides.length)];
            const price = Math.floor(Math.random() * (template.priceMax - template.priceMin + 1)) + template.priceMin;
            const rating = (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1); // 4.2 to 5.0 for quality feel

            // Add some jitter to coordinates
            const lat = city.lat + (Math.random() - 0.5) * 0.08;
            const lng = city.lng + (Math.random() - 0.5) * 0.08;

            const isUpcoming = Math.random() > 0.8;
            const upcomingTeaser = isUpcoming ? " [Upcoming: VR 360° Preview Support!]" : "";

            const tour = await prisma.tour.create({
                data: {
                    title: template.title.replace('{city}', city.name),
                    description: template.desc.replace('{city}', city.name) + ` Experience the authentic vibes of ${city.name}, ${city.country}.` + upcomingTeaser,
                    itinerary: `Welcome Session → ${template.category} Highlight → Secret Local Spot → Traditional Tasting → Q&A Session`,
                    city: city.name,
                    country: city.country,
                    category: template.category,
                    images: template.images,
                    price: price,
                    duration: `${Math.floor(Math.random() * 3) + 3} hours`,
                    meetingPoint: `Central ${city.name} Landmark`,
                    maxGroupSize: Math.floor(Math.random() * 8) + 4,
                    languages: guide.languages,
                    coordinateX: lat,
                    coordinateY: lng,
                    rating: parseFloat(rating),
                    isFeatured: Math.random() > 0.7, // 30% featured
                    guideId: guide.id
                }
            });
            allTours.push(tour);
            tourCount++;
        }
    }
    console.log(`✅ Created ${tourCount} tours across ${CITIES.length} cities`);

    // 5. Create Bookings & Reviews
    // Create random bookings for the tourist
    for (let i = 0; i < 50; i++) {
        const randomTour = allTours[Math.floor(Math.random() * allTours.length)];
        const status = Math.random() > 0.1 ? 'CONFIRMED' : 'PENDING';

        await prisma.booking.create({
            data: {
                userId: tourist.id,
                tourId: randomTour.id,
                bookingDate: new Date(),
                tourDate: new Date(Date.now() + Math.random() * 10000000000),
                status: status as any,
                totalAmount: randomTour.price * 2,
                guests: 2,
                paymentStatus: status === 'CONFIRMED' ? 'PAID' : 'UNPAID',
                specialRequirements: 'Vegetarian options preferred',
                contactPhone: '+880123456789'
            }
        });

        // Add high quality review
        if (Math.random() > 0.4) {
            await prisma.review.create({
                data: {
                    userId: tourist.id,
                    tourId: randomTour.id,
                    rating: 5,
                    comment: `Absolutely loved this ${randomTour.title}! Our guide ${randomTour.guideId} was incredible.`
                }
            });
        }
    }
    console.log('✅ Created 50 bookings and high-quality reviews');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
