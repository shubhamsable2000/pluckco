'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Notification {
  id: string;
  message: string;
  created_at: string;
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'Notification 1',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      message: 'Notification 2',
      created_at: new Date().toISOString(),
    },
  ]);

  useEffect(() => {
    // Mock fetching notifications - replace with your actual fetch logic if needed.
    const intervalId = setInterval(() => {
      setNotifications((prevNotifications) => {
        const newNotification = {
          id: (prevNotifications.length + 1).toString(),
          message: `New notification ${prevNotifications.length + 1}`,
          created_at: new Date().toISOString(),
        };
        return [newNotification, ...prevNotifications].slice(0, 5); // Limit to 5 notifications
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        {notifications.length === 0 ? (
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id}>
              <Card>
                <CardContent className="p-3">
                  <p>{notification.message}</p>
                  <small>
                    {new Date(notification.created_at).toLocaleString()}
                  </small>
                </CardContent>
              </Card>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
