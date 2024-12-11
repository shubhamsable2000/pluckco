import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BookingConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    restaurantName: string;
    date: string;
    time: string;
    guests: string;
  };
}

export function BookingConfirmation({
  isOpen,
  onClose,
  bookingDetails,
}: BookingConfirmationProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            Booking Confirmed!
          </DialogTitle>
          <DialogDescription>
            Your table has been reserved at {bookingDetails.restaurantName}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            <p>
              <strong>Date:</strong> {bookingDetails.date}
            </p>
            <p>
              <strong>Time:</strong> {bookingDetails.time}
            </p>
            <p>
              <strong>Number of Guests:</strong> {bookingDetails.guests}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>View My Bookings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
