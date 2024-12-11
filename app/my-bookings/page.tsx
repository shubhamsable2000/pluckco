'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin, Users, Camera } from 'lucide-react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import Image from 'next/image';

// Updated mock booking data to include tasks
const mockBookings = [
  {
    id: 1,
    restaurantName: 'Fenway Bites',
    date: '2024-12-03',
    time: '19:00',
    guests: 2,
    status: 'upcoming',
    address: '123 Yawkey Way, Boston, MA',
    image: '/d1.webp',
    tasks: [
      {
        id: 1,
        platform: 'Instagram',
        action: 'Share a story',
        reward: '10% off',
        completed: false,
      },
      {
        id: 2,
        platform: 'Google',
        action: 'Write a review',
        reward: 'Free appetizer',
        completed: false,
      },
    ],
  },
  {
    id: 2,
    restaurantName: 'North End Trattoria',
    date: '2024-12-05',
    time: '20:30',
    guests: 4,
    status: 'checked-in',
    address: '87 Hanover St, Boston, MA',
    image: '/d2.webp',
    tasks: [
      {
        id: 3,
        platform: 'Instagram',
        action: 'Post a photo',
        reward: '15% off',
        completed: false,
      },
    ],
  },
];

export default function MyBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState(mockBookings);
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/signin');
    }
  }, [router]);

  const handleCheckIn = (bookingId: number) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'checked-in' }
          : booking
      )
    );
    toast({
      title: 'Checked In',
      description: "You've successfully checked in to your booking.",
    });
  };

  const handleReschedule = (
    bookingId: number,
    newDate: string,
    newTime: string
  ) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, date: newDate, time: newTime }
          : booking
      )
    );
    toast({
      title: 'Booking Rescheduled',
      description: 'Your booking has been successfully rescheduled.',
    });
  };

  const handleTaskCompletion = (bookingId: number, taskId: number) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              tasks: booking.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: true } : task
              ),
            }
          : booking
      )
    );
    toast({
      title: 'Task Completed',
      description: 'Your task has been marked as completed.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text animate-gradient">
          My Bookings
        </h1>

        <div className="grid gap-6">
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              className="border-2 border-muted hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-6 bg-white">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <Image
                      src={booking.image}
                      alt={booking.restaurantName}
                      width={800}
                      height={400}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-black mb-2">
                        {booking.restaurantName}
                      </h2>
                      <p className="flex items-center text-muted-foreground gap-2">
                        <MapPin className="w-4 h-4" />
                        {booking.address}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {booking.time}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {booking.guests} guests
                      </div>
                      <Badge
                        className={
                          booking.status === 'upcoming'
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-green-500 text-white'
                        }
                      >
                        {booking.status === 'upcoming'
                          ? 'Upcoming'
                          : 'Checked In'}
                      </Badge>
                    </div>

                    {booking.status === 'upcoming' && (
                      <div className="flex gap-4">
                        <Button
                          onClick={() => handleCheckIn(booking.id)}
                          className="text-white bg-black"
                        >
                          Check In
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="text-white bg-black">
                              Reschedule
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reschedule Booking</DialogTitle>
                            </DialogHeader>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleReschedule(
                                  booking.id,
                                  formData.get('date') as string,
                                  formData.get('time') as string
                                );
                              }}
                              className="space-y-4"
                            >
                              <div>
                                <Label htmlFor="date">New Date</Label>
                                <Input
                                  id="date"
                                  name="date"
                                  type="date"
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="time">New Time</Label>
                                <Input
                                  id="time"
                                  name="time"
                                  type="time"
                                  required
                                />
                              </div>
                              <Button type="submit">Confirm Reschedule</Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}

                    {booking.status === 'checked-in' && (
                      <div>
                        <h3 className="font-semibold mb-2 text-black">
                          Influencer Tasks
                        </h3>
                        <div className="grid gap-2">
                          {booking.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted"
                            >
                              <span className="text-muted-foreground">
                                {task.action}
                              </span>
                              {task.completed ? (
                                <Badge
                                  variant="outline"
                                  className="border-green-500 text-green-500"
                                >
                                  Completed
                                </Badge>
                              ) : (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm">
                                      <Camera className="w-4 h-4 mr-2" />
                                      Upload Photo
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Upload Task Photo
                                      </DialogTitle>
                                    </DialogHeader>
                                    <form
                                      onSubmit={(e) => {
                                        e.preventDefault();
                                        handleTaskCompletion(
                                          booking.id,
                                          task.id
                                        );
                                      }}
                                      className="space-y-4"
                                    >
                                      <div>
                                        <Label htmlFor="photo">
                                          Task Photo
                                        </Label>
                                        <Input
                                          id="photo"
                                          name="photo"
                                          type="file"
                                          accept="image/*"
                                          required
                                        />
                                      </div>
                                      <Button type="submit">Submit Task</Button>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
