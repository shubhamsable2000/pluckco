'use client';

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Filter, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '../components/navigation';
import { Badge } from '@/components/ui/badge';

import Image from 'next/image';
import { Footer } from '../components/footer';

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  places: number;
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  address: string;
  rating: number;
  image: string;
  offer?: string;
  priceForTwo: string;
  distance: string;
  isNew?: boolean;
}

export default function ExplorePage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  // const router = useRouter();

  useEffect(() => {
    // Mock collections data
    const mockCollections: Collection[] = [
      {
        id: '1',
        title: 'Top Trending Spots',
        description: 'Most popular restaurants in Boston right now',
        image: '/i1.webp',
        places: 25,
      },
      {
        id: '2',
        title: 'Newly Opened Places',
        description: "Latest additions to Boston's dining scene",
        image: '/i2.webp',
        places: 20,
      },
      {
        id: '3',
        title: 'Best Rooftop Places',
        description: 'Stunning views and great food combined',
        image: '/i3.webp',
        places: 18,
      },
      {
        id: '4',
        title: 'Best Insta-worthy Places',
        description: 'Picture perfect spots for your feed',
        image: '/i4.webp',
        places: 29,
      },
    ];

    // Mock restaurants data
    const mockRestaurants: Restaurant[] = [
      {
        id: '1',
        name: 'Fenway Bites',
        cuisine: ['American', 'Sports Bar', 'Burgers'],
        address: '123 Yawkey Way, Boston, MA 02215',
        rating: 4.5,
        image: '/r1.webp',
        offer: 'Flat 20% OFF',
        priceForTwo: '$80 for two',
        distance: '1.2 km',
        isNew: true,
      },
      {
        id: '2',
        name: 'Little Italy Trattoria',
        cuisine: ['Italian', 'Pizza', 'Pasta'],
        address: 'North End, Boston',
        rating: 4.7,
        image: '/r2.webp',
        priceForTwo: '$60 for two',
        distance: '2.5 km',
      },
      {
        id: '3',
        name: 'Beacon Hill Bistro',
        cuisine: ['French', 'European', 'Wine Bar'],
        address: 'Beacon Hill, Boston',
        rating: 4.6,
        image: '/r3.webp',
        offer: 'Complimentary Wine',
        priceForTwo: '$100 for two',
        distance: '0.8 km',
      },
    ];

    setCollections(mockCollections);
    setRestaurants(mockRestaurants);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Categories */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Collections */}
        <section className="mb-12 w-full  ">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Collections</h2>
            <h3 className="text-black">
              Explore curated lists of top restaurants, cafes, pubs, and bars in
              Boston, based on trends
            </h3>
            <Button variant="ghost" className="text-primary text-black">
              See all collections
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <Link href={`/collection/${collection.id}`} key={collection.id}>
                <Card className="group cursor-pointer overflow-hidden bg-card hover:bg-card/80 ">
                  <div className="relative h-80">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      height={1000}
                      width={650}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg mb-1">
                        {collection.title}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {collection.places} Places
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <Button
            size="sm"
            className="flex items-center gap-2 text-sm py-1 px-2 rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button
            size="sm"
            className="text-sm py-1 px-2 rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Rating: 4.5+
          </Button>
          <Button
            size="sm"
            className="text-sm py-1 px-2 rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Outdoor Seating
          </Button>
          <Button
            size="sm"
            className="text-sm py-1 px-2 rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Pet Friendly
          </Button>
          <Button
            size="sm"
            className="text-sm py-1 px-2 rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Serves Alcohol
          </Button>
          <Button
            size="sm"
            className="text-sm py-1 px-2 rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Open Now
          </Button>
        </div>

        {/* Restaurants */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <Card
                key={restaurant.id}
                className="overflow-hidden hover:shadow-lg transition-shadow bg-card hover:bg-card/80"
              >
                <Link href={`/restaurant/${restaurant.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                    {restaurant.offer && (
                      <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                        {restaurant.offer}
                      </Badge>
                    )}
                    {restaurant.isNew && (
                      <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                        New
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4 bg-white border-none">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-black">
                          {restaurant.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-1">
                          {restaurant.cuisine.join(', ')}
                        </p>
                        <p className="text-muted-foreground text-sm mb-2 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {restaurant.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-primary/20 px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-primary">
                          {restaurant.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-4">
                      <span className="text-muted-foreground">
                        {restaurant.priceForTwo}
                      </span>
                      <span className="text-muted-foreground">
                        {restaurant.distance}
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
