'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Edit,
  PlusCircle,
  Trash2,
  CheckCircle,
  Clock,
  Users,
  Instagram,
  ChromeIcon as Google,
} from 'lucide-react';
import Navigation from '../components/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    customerName: 'Alex Chen',
    date: '2024-12-03',
    time: '19:00',
    guests: 4,
    status: 'pending',
    isInfluencer: true,
    instagramHandle: '@alexeats',
  },
  {
    id: 2,
    customerName: 'Sarah Kim',
    date: '2024-12-03',
    time: '20:00',
    guests: 2,
    status: 'completed',
    isInfluencer: true,
    instagramHandle: '@sarahfoodie',
  },
  {
    id: 3,
    customerName: 'Mike Johnson',
    date: '2024-12-03',
    time: '19:30',
    guests: 6,
    status: 'pending',
    isInfluencer: false,
  },
];

// Mock data for influencer tasks
const mockInfluencerTasks = [
  {
    id: 1,
    influencer: 'Alex Chen',
    instagramHandle: '@alexeats',
    completedTasks: [
      {
        platform: 'Instagram',
        type: 'Story',
        date: '2024-12-02',
        reward: '20% off',
      },
      {
        platform: 'Google',
        type: 'Review',
        date: '2024-12-02',
        reward: 'Free dessert',
      },
    ],
    pendingTasks: [
      { platform: 'Instagram', type: 'Post', reward: '30% off next visit' },
    ],
  },
  {
    id: 2,
    influencer: 'Sarah Kim',
    instagramHandle: '@sarahfoodie',
    completedTasks: [
      {
        platform: 'Instagram',
        type: 'Post',
        date: '2024-12-01',
        reward: '30% off',
      },
    ],
    pendingTasks: [
      { platform: 'Google', type: 'Review', reward: 'Free appetizer' },
      { platform: 'Instagram', type: 'Story', reward: '15% off next visit' },
    ],
  },
];

interface Campaign {
  id: number;
  businessName: string;
  offer: string;
  endDate: string;
  image: string;
}

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [bookings, setBookings] = useState(mockBookings);
  const [newCampaign, setNewCampaign] = useState({
    businessName: '',
    offer: '',
    description: '',
    image: '',
    endDate: '',
  });
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/signin');
      return;
    }

    // Mock campaigns data
    const mockCampaigns = [
      {
        id: 1,
        businessName: 'Pizza Place',
        offer: '20% off',
        endDate: '2023-12-31',
        image: '/d1.webp',
      },
      {
        id: 2,
        businessName: 'Burger Joint',
        offer: 'Free drink',
        endDate: '2023-11-30',
        image: '/d2.webp',
      },
    ];
    setCampaigns(mockCampaigns);
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewCampaign({ ...newCampaign, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const campaign = { ...newCampaign, id: Date.now() };
    setCampaigns([...campaigns, campaign]);
    setNewCampaign({
      businessName: '',
      offer: '',
      description: '',
      image: '',
      endDate: '',
    });
    toast({
      title: 'Campaign created',
      description: 'Your new campaign has been successfully created.',
    });
  };

  const markBookingComplete = (bookingId: number) => {
    // Use the bookingId parameter
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: 'completed' } : booking
    );
    setBookings(updatedBookings);

    toast({
      title: 'Booking marked as completed',
      description: 'The booking has been marked as completed successfully.',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="container bg-white mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-black text-transparent bg-clip-text">
          Restaurant Dashboard
        </h1>

        <Tabs defaultValue="bookings" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 rounded-xl bg-slate-100 p-1">
            <TabsTrigger
              value="bookings"
              className="rounded-lg data-[state=active]:bg-black"
            >
              Today&apos;s Bookings
            </TabsTrigger>
            <TabsTrigger
              value="campaigns"
              className="rounded-lg data-[state=active]:bg-black"
            >
              Campaigns
            </TabsTrigger>
            <TabsTrigger
              value="influencers"
              className="rounded-lg data-[state=active]:bg-black"
            >
              Influencer Tasks
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="rounded-lg data-[state=active]:bg-black"
            >
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className=" bg-white border-2 border-black">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-700">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Today's Bookings
                </CardTitle>
                <CardDescription>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Manage your restaurant's bookings for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <Card
                      key={booking.id}
                      className="bg-white hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-black font-bold">
                              {booking.customerName.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg flex items-center text-black gap-2">
                                {booking.customerName}
                                {booking.isInfluencer && (
                                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                                    Influencer
                                  </Badge>
                                )}
                              </h3>
                              {booking.isInfluencer && (
                                <p className="text-sm text-purple-600">
                                  {booking.instagramHandle}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="w-4 h-4" />
                                {booking.time}
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Users className="w-4 h-4" />
                                {booking.guests} guests
                              </div>
                            </div>
                            {booking.status === 'pending' ? (
                              <Button
                                onClick={() => markBookingComplete(booking.id)}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                              >
                                Mark Complete
                              </Button>
                            ) : (
                              <Badge className="bg-green-500">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white">
              <Card className="border-2 border-purple-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-700">
                    Active Campaigns
                  </CardTitle>
                  <CardDescription>
                    View and manage your active campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {campaigns.map((campaign: Campaign) => (
                      <Card
                        key={campaign.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48 bg-white">
                          <Image
                            src={campaign.image}
                            alt={campaign.businessName}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <Button variant="secondary" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-4 bg-white">
                          <h3 className="font-bold text-lg mb-2 text-black">
                            {campaign.businessName}
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">
                            {campaign.offer}
                          </p>
                          <p className="text-xs text-gray-500">
                            Ends: {campaign.endDate}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Create New Campaign
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Campaign</DialogTitle>
                        <DialogDescription>
                          Fill out the form to create a new campaign for
                          influencers
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="businessName">Business Name</Label>
                          <Input
                            id="businessName"
                            name="businessName"
                            value={newCampaign.businessName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="offer">Offer</Label>
                          <Input
                            id="offer"
                            name="offer"
                            value={newCampaign.offer}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={newCampaign.description}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="image">Image URL</Label>
                          <Input
                            id="image"
                            name="image"
                            value={newCampaign.image}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            value={newCampaign.endDate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          >
                            Create Campaign
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>

              <div className="space-y-8">
                <Card className="border-2 border-purple-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl text-purple-700">
                      Quick Stats
                    </CardTitle>
                    <CardDescription>
                      Overview of your campaign performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                        <CardContent className="p-4 text-center">
                          <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                            152
                          </p>
                          <p className="text-sm text-gray-600">
                            Total Influencers
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                        <CardContent className="p-4 text-center">
                          <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                            3.2K
                          </p>
                          <p className="text-sm text-gray-600">
                            Total Engagements
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                        <CardContent className="p-4 text-center">
                          <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                            $1.5K
                          </p>
                          <p className="text-sm text-gray-600">
                            Revenue Generated
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                        <CardContent className="p-4 text-center">
                          <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                            4.8
                          </p>
                          <p className="text-sm text-gray-600">
                            Average Rating
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="influencers">
            <Card className="border-2 border-purple-200 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-700">
                  Influencer Task Tracking
                </CardTitle>
                <CardDescription>
                  Monitor influencer engagement and task completion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockInfluencerTasks.map((influencer) => (
                    <Card
                      key={influencer.id}
                      className="bg-white hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                              {influencer.influencer.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-black">
                                {influencer.influencer}
                              </h3>
                              <p className="text-sm text-black">
                                {influencer.instagramHandle}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-purple-700 mb-2">
                              Completed Tasks
                            </h4>
                            <div className="grid gap-2">
                              {influencer.completedTasks.map((task, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg text-black border border-green-200"
                                >
                                  <div className="flex items-center gap-2">
                                    {task.platform === 'Instagram' ? (
                                      <Instagram className="w-5 h-5 text-pink-600" />
                                    ) : (
                                      <Google className="w-5 h-5 text-blue-600" />
                                    )}
                                    <span>{task.type}</span>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-600">
                                      {task.date}
                                    </span>
                                    <Badge className="bg-green-500">
                                      {task.reward}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-purple-700 mb-2">
                              Pending Tasks
                            </h4>
                            <div className="grid gap-2">
                              {influencer.pendingTasks.map((task, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200"
                                >
                                  <div className="flex items-center gap-2 text-black">
                                    {task.platform === 'Instagram' ? (
                                      <Instagram className="w-5 h-5 text-purple-500" />
                                    ) : (
                                      <Google className="w-5 h-5 text-blue-600" />
                                    )}
                                    <span>{task.type}</span>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="border-purple-500 text-purple-500"
                                  >
                                    {task.reward}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card className="border-2 border-purple-200 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-700">
                  Detailed Analytics
                </CardTitle>
                <CardDescription>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Comprehensive view of your restaurant's performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Add detailed analytics components here */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
