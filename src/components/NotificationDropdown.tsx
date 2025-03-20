import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUserMessages } from "@/pages/api/User";

interface Notification {
  id: string;
  message: string;
  time: string;
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notificationsCall = async () => {
    try {
      const response = await getUserMessages();
      if (Array.isArray(response)) {
        const formattedNotifications: Notification[] = response.map((item) => ({
          id: item._id,
          message: item.message,
          time: new Date(item.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setNotifications(formattedNotifications);
      } else {
        console.error("Invalid API response:", response);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    notificationsCall();
  }, []);

  return (
    <div>
      <Button
        variant="ghost"
        className="relative p-2 rounded-full"
        onClick={() => setIsOpen(true)}
      >
        <Bell className="h-6 w-6" />
        <span className="sr-only">Open Notifications</span>
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full max-w-sm md:max-w-md bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <div className="max-h-72 overflow-auto">
            {notifications.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="flex justify-between items-center p-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
                  >
                    <span>{notification.message}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {notification.time}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-3 text-center text-gray-500">
                No new notifications
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
