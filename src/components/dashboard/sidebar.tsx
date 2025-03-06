"use client";

import { useState } from "react";
import {
  BarChart3,
  Bus,
  GraduationCap,
  Home,
  MapPin,
  Settings,
  UserCheck,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Location History", href: "/dashboard/location", icon: MapPin },
  { title: "Bus Tracking", href: "/dashboard/bus", icon: Bus },
  { title: "Our College", href: "/dashboard/college", icon: GraduationCap },
  {
    title: "Attendance History",
    href: "/dashboard/attendance",
    icon: UserCheck,
  },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
  { title: "Statistics", href: "/dashboard/statistics", icon: BarChart3 },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logout clicked");
    alert("Logout clicked");
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-6 left-6 z-50 p-3 rounded-lg bg-purple-600 text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-purple1 text-white shadow-lg transition-transform duration-300 flex flex-col justify-between z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:relative md:flex`}
      >
        <br></br>
        <br></br>
        <br></br>
        {/* Sidebar Navigation */}
        <nav className="flex-1 px-6 py-6">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 text-lg transition-colors duration-200 ${
                    pathname === item.href
                      ? "bg-white text-purple-700"
                      : "hover:bg-purple-800"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-6">
          <button
            className="bg-purple-800 hover:bg-purple-900 p-3 w-full rounded-lg text-lg transition-transform duration-200 hover:scale-105"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
