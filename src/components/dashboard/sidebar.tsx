"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bus,
  GraduationCap,
  Home,
  Settings,
  UserCheck,
  Menu,
  X,
  LogOut as LogOutIcon,
} from "lucide-react";
import { LogOut } from "../services/auth";
import ScaleLoader from "@/components/loader/ScaleLoader";
import { motion } from "framer-motion";

const sidebarItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Bus Tracking", href: "/dashboard/bus", icon: Bus },
  { title: "Statistics", href: "/dashboard/statistics", icon: BarChart3 },
  { title: "Our College", href: "/dashboard/college", icon: GraduationCap },
  { title: "Attendance", href: "/dashboard/attendance", icon: UserCheck },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (loadingProgress > 0 && loadingProgress < 100) {
      timer = setTimeout(() => setLoadingProgress((prev) => prev + 20), 100);
    }
    return () => clearTimeout(timer);
  }, [loadingProgress]);

  const handleLogout = async () => {
    setIsLoading(true);
    await LogOut();
    setIsLoading(false);
    router.push("/");
  };

  const handleNavigation = (href: string) => {
    setIsOpen(false); // Close sidebar on mobile
    setLoadingProgress(20);
    router.push(href);
    setTimeout(() => setLoadingProgress(100), 500);
  };

  return (
    <div>
      {/* Loading Bar */}
      {loadingProgress > 0 && (
        <motion.div
          className="fixed top-0 left-0 h-1 bg-purple-600 z-50"
          initial={{ width: "0%" }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => {
            if (loadingProgress >= 100) {
              setTimeout(() => setLoadingProgress(0), 300);
            }
          }}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-6 left-6 z-50 p-3 rounded-lg bg-purple-600 text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-purple1 text-white shadow-lg transition-transform duration-300 flex flex-col justify-between z-40 md:relative md:flex md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Navigation */}
        <nav className="flex-1 px-6 py-24 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarItems.map(({ title, href, icon: Icon }) => (
              <li key={href}>
                <button
                  className={`flex items-center w-full gap-3 rounded-lg px-4 py-2 text-lg transition-all duration-200 focus:outline-none ${
                    pathname === href
                      ? "bg-white text-purple-700 font-semibold"
                      : "hover:bg-purple-700"
                  }`}
                  onClick={() => handleNavigation(href)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-6">
          <button
            className="bg-purple-700 hover:bg-purple-800 p-3 w-full rounded-lg text-lg transition-all duration-200 hover:scale-105 flex items-center justify-center"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? <ScaleLoader className="text-gray-200" /> : "Logout"}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
