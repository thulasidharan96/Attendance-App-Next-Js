import { Bus, GraduationCap, MapPin, UserCheck } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const cards = [
  {
    title: "Our School",
    href: "/dashboard/college",
    icon: GraduationCap,
    lightColor: "bg-purple-100 text-purple-800",
    darkColor: "bg-purple-900 text-purple-300",
  },
  {
    title: "Location History",
    href: "/dashboard/location",
    icon: MapPin,
    lightColor: "bg-blue-100 text-blue-800",
    darkColor: "bg-blue-900 text-blue-300",
  },
  {
    title: "Attendance History",
    href: "/dashboard/attendance",
    icon: UserCheck,
    lightColor: "bg-green-100 text-green-800",
    darkColor: "bg-green-900 text-green-300",
  },
  {
    title: "Bus Tracking",
    href: "/dashboard/bus",
    icon: Bus,
    lightColor: "bg-yellow-100 text-yellow-800",
    darkColor: "bg-yellow-900 text-yellow-300",
  },
];

export function DashboardCards() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration issues

  const isDarkMode = resolvedTheme === "dark";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className={`rounded-xl p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-101 border shadow-md ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-gray-100 border-gray-200 text-gray-800"
          }`}
        >
          <div
            className={`p-3 rounded-full mb-3 ${
              isDarkMode ? card.darkColor : card.lightColor
            }`}
          >
            <card.icon className="h-6 w-6" />
          </div>
          <h3 className="font-medium">{card.title}</h3>
        </Link>
      ))}
    </div>
  );
}
