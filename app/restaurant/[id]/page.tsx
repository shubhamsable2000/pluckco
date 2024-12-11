'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Users,
  Instagram,
  ChromeIcon as Google,
  DollarSign,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { useToast } from '@/hooks/use-toast';

interface RestaurantDetails {
  id: string;
  name: string;
  cuisines: string[];
  address: string;
  rating: { dining: number; delivery: number };
  costForTwo: string;
  images: string[];
  offers: {
    title: string;
    description: string;
    type: string;
  }[];
  timeSlots: string[];
  features: string[];
  menu: {
    category: string;
    items: {
      name: string;
      description: string;
      price: number;
    }[];
  }[];
  reviews: {
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  tasks: {
    platform: string;
    action: string;
    reward: string;
  }[];
}

// Mock function to fetch restaurant data
const fetchRestaurantData = async (id: string): Promise<RestaurantDetails> => {
  // In a real app, this would be an API call
  const mockRestaurants: RestaurantDetails[] = [
    {
      id: '1',
      name: 'Fenway Bites',
      cuisines: ['American', 'Sports Bar', 'Burgers'],
      address: '123 Yawkey Way, Boston, MA 02215',
      rating: { dining: 4.3, delivery: 4.1 },
      costForTwo: '$50',
      images: ['/d1.webp', '/d2.webp', '/d3.webp'],
      offers: [
        {
          title: 'Game Day Special',
          description: '20% off all appetizers on Red Sox game days',
          type: 'RESTAURANT_OFFER',
        },
        {
          title: 'Happy Hour',
          description: '$5 draft beers from 4-6 PM, Monday to Friday',
          type: 'RESTAURANT_OFFER',
        },
      ],
      timeSlots: [
        '11:30 AM',
        '12:00 PM',
        '12:30 PM',
        '1:00 PM',
        '1:30 PM',
        '5:00 PM',
        '5:30 PM',
        '6:00 PM',
        '6:30 PM',
        '7:00 PM',
      ],
      features: [
        'Sports Viewing',
        'Outdoor Seating',
        'Full Bar',
        'Live Music on Weekends',
      ],
      menu: [
        {
          category: 'Appetizers',
          items: [
            {
              name: 'Loaded Nachos',
              description:
                'Tortilla chips with cheese, jalapeños, and all the fixings',
              price: 12.99,
            },
            {
              name: 'Buffalo Wings',
              description: 'Crispy wings tossed in our signature buffalo sauce',
              price: 14.99,
            },
          ],
        },
        {
          category: 'Main Courses',
          items: [
            {
              name: 'Fenway Burger',
              description:
                '1/3 lb beef patty with lettuce, tomato, and special sauce',
              price: 16.99,
            },
            {
              name: 'Green Monster Salad',
              description:
                'Fresh greens, grilled chicken, avocado, and house dressing',
              price: 15.99,
            },
          ],
        },
      ],
      reviews: [
        {
          author: 'John D.',
          rating: 5,
          comment:
            'Best sports bar near Fenway! Great atmosphere on game days.',
          date: '2023-05-15',
        },
        {
          author: 'Sarah M.',
          rating: 4,
          comment:
            "Solid food and drinks. Can get crowded but that's expected.",
          date: '2023-06-02',
        },
      ],
      tasks: [
        {
          platform: 'Instagram',
          action: 'Post a story of your meal',
          reward: '10% off your bill',
        },
        {
          platform: 'Instagram',
          action: 'Post a feed photo tagging @FenwayBites',
          reward: 'Free appetizer on your next visit',
        },
        {
          platform: 'Google',
          action: 'Leave a review',
          reward: 'Enter a raffle for Red Sox tickets',
        },
      ],
    },
    {
      id: '2',
      name: 'North End Trattoria',
      cuisines: ['Italian', 'Pizza', 'Pasta'],
      address: '87 Hanover St, Boston, MA 02113',
      rating: { dining: 4.7, delivery: 4.5 },
      costForTwo: '$70',
      images: [
        'https://source.unsplash.com/random/800x400/?italian-restaurant',
        'https://source.unsplash.com/random/800x400/?pizza',
        'https://source.unsplash.com/random/800x400/?pasta',
      ],
      offers: [
        {
          title: 'Date Night Special',
          description:
            'Complimentary dessert with purchase of two entrees, Tue-Thu',
          type: 'RESTAURANT_OFFER',
        },
      ],
      timeSlots: [
        '5:00 PM',
        '5:30 PM',
        '6:00 PM',
        '6:30 PM',
        '7:00 PM',
        '7:30 PM',
        '8:00 PM',
        '8:30 PM',
        '9:00 PM',
      ],
      features: [
        'Authentic Italian Cuisine',
        'Wine Pairing',
        'Homemade Pasta',
        'Romantic Atmosphere',
      ],
      menu: [
        {
          category: 'Antipasti',
          items: [
            {
              name: 'Bruschetta',
              description:
                'Grilled bread rubbed with garlic and topped with diced tomatoes',
              price: 9.99,
            },
            {
              name: 'Caprese Salad',
              description:
                'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze',
              price: 12.99,
            },
          ],
        },
        {
          category: 'Primi Piatti',
          items: [
            {
              name: 'Spaghetti Carbonara',
              description: 'Classic carbonara with pancetta and egg',
              price: 18.99,
            },
            {
              name: 'Risotto ai Funghi',
              description: 'Creamy risotto with wild mushrooms',
              price: 20.99,
            },
          ],
        },
      ],
      reviews: [
        {
          author: 'Maria G.',
          rating: 5,
          comment:
            'Truly authentic Italian cuisine. Felt like I was back in Rome!',
          date: '2023-06-10',
        },
        {
          author: 'Tom H.',
          rating: 4,
          comment:
            'Great food and ambiance. A bit pricey but worth it for special occasions.',
          date: '2023-05-28',
        },
      ],
      tasks: [
        {
          platform: 'Instagram',
          action: 'Share a photo of your pasta dish',
          reward: '15% off your next visit',
        },
        {
          platform: 'Instagram',
          action: 'Create a Reel showcasing your dining experience',
          reward: 'Complimentary appetizer',
        },
        {
          platform: 'Google',
          action: 'Write a detailed review',
          reward: 'Enter to win a private pasta-making class',
        },
      ],
    },
  ];

  const restaurant = mockRestaurants.find((r) => r.id === id);
  if (!restaurant) {
    throw new Error('Restaurant not found');
  }
  return restaurant;
};

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const [
    restaurantData,
    setRestaurantData,
  ] = useState<RestaurantDetails | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [selectedGuests, setSelectedGuests] = useState<string>('2');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRestaurantData(params.id);
      setRestaurantData(data);
    };
    fetchData();
  }, [params.id]);

  const handleBooking = () => {
    if (!selectedTime) {
      toast({
        title: 'Please select a time slot',
        variant: 'destructive',
      });
      return;
    }

    // In a real app, you would send this to your backend
    const bookingDetails = {
      restaurantId: restaurantData?.id,
      date: selectedDate,
      time: selectedTime,
      guests: selectedGuests,
    };

    console.log('Booking details:', bookingDetails);

    toast({
      title: 'Booking Confirmed!',
      description: `Your table has been booked for ${selectedGuests} guests on ${selectedDate} at ${selectedTime}`,
    });

    setIsBookingOpen(false);
    router.push('/my-bookings');
  };

  if (!restaurantData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Restaurant Header */}
      <div className="relative h-[400px]">
        <Image
          src={restaurantData.images[0]}
          alt={restaurantData.name}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{restaurantData.name}</h1>
            <p className="text-lg mb-2">{restaurantData.cuisines.join(', ')}</p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {restaurantData.address}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 w-full justify-start bg-white/50 p-1 rounded-lg">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="menu"
                  className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                >
                  Menu
                </TabsTrigger>
                <TabsTrigger
                  value="photos"
                  className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                >
                  Photos
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-6">
                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 text-black">
                        About
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-400" />
                          <span className="text-black">
                            {restaurantData.rating.dining} Dining Rating
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-black" />
                          <span className="text-black">
                            {restaurantData.costForTwo} for two
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 text-purple-700">
                        Offers
                      </h3>
                      <div className="space-y-4">
                        {restaurantData.offers.map((offer, index) => (
                          <div
                            key={index}
                            className="p-4 border border-purple-200 rounded-lg bg-purple-50"
                          >
                            <h4 className="font-semibold text-purple-700">
                              {offer.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {offer.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 text-purple-700">
                        Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {restaurantData.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 text-purple-700">
                        Influencer Tasks
                      </h3>
                      <div className="space-y-4">
                        {restaurantData.tasks.map((task, index) => (
                          <div
                            key={index}
                            className="p-4 border border-purple-200 rounded-lg bg-purple-50"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {task.platform === 'Instagram' && (
                                <Instagram className="w-5 h-5 text-pink-600" />
                              )}
                              {task.platform === 'Google' && (
                                <Google className="w-5 h-5 text-blue-600" />
                              )}
                              <span className="font-semibold text-purple-700">
                                {task.platform} Task
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {task.action}
                            </p>
                            <p className="text-sm font-semibold text-green-600 flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              Reward: {task.reward}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="menu">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-purple-700">
                      Menu
                    </h3>
                    {restaurantData.menu.map((category, index) => (
                      <div key={index} className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-purple-600">
                          {category.category}
                        </h4>
                        <ul className="space-y-4">
                          {category.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="border-b border-purple-100 pb-4"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-semibold text-purple-700">
                                    {item.name}
                                  </h5>
                                  <p className="text-sm text-gray-600">
                                    {item.description}
                                  </p>
                                </div>
                                <span className="font-semibold text-purple-600">
                                  ${item.price.toFixed(2)}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="photos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {restaurantData.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      height={600}
                      width={600}
                      alt={`${restaurantData.name} - Photo ${index + 1}`}
                      className="rounded-lg object-cover w-full h-64 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-purple-700">
                      Reviews
                    </h3>
                    <div className="space-y-6">
                      {restaurantData.reviews.map((review, index) => (
                        <div
                          key={index}
                          className="border-b border-purple-100 pb-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-semibold text-purple-700">
                                {review.author}
                              </h5>
                              <p className="text-sm text-gray-500">
                                {review.date}
                              </p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[350px]">
            <Card className="sticky top-4 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-700">
                  Reserve a Table
                </h3>
                <div className="space-y-4">
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger className="w-full text-black">
                      <Calendar className="w-4 h-4 mr-2 text-black" />
                      <SelectValue
                        placeholder="Select date"
                        className="text-black"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Today">Today</SelectItem>
                      <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedGuests}
                    onValueChange={setSelectedGuests}
                  >
                    <SelectTrigger className="w-full text-black">
                      <Users className="w-4 h-4 mr-2 text-black" />
                      <SelectValue placeholder="Number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    className="w-full bg-black hover:bg-purple-700 text-white"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-black mb-4">
              Select Time Slot
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-wrap gap-2">
              {restaurantData.timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedTime === slot ? 'default' : 'outline'}
                  onClick={() => setSelectedTime(slot)}
                  className={`flex items-center gap-2 ${
                    selectedTime === slot
                      ? 'bg-black text-white'
                      : 'bg-white text-purple-600 border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  {slot}
                </Button>
              ))}
            </div>
            <Button
              onClick={handleBooking}
              className="w-full mt-4 bg-black hover:bg-black-700 text-white"
            >
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
