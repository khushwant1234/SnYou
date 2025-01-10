"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Search, Bell, User } from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  // Navigation items
  const navItems: NavItem[] = [
    { icon: <Home className="h-6 w-6" />, label: "Home", href: "/" },
    {
      icon: <Search className="h-6 w-6" />,
      label: "Explore",
      href: "/explore",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      label: "Plan",
      href: "/plan",
    },
    {
      icon: <User className="h-6 w-6" />,
      label: "My Profile",
      href: "/profile",
    },
    { icon: <User className="h-6 w-6" />, label: "Our Team", href: "/team" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation without Next.js Link
  const handleNavigation = (href: string) => {
    setCurrentPath(href);
    // You can add your own navigation logic here
    // For example, updating the URL with history.pushState
    // Updates the URL in the browser's address bar without triggering a page reload
    window.history.pushState({}, "", href); // Remove this after testing
  };

  return (
    <nav
      className={`
        fixed bottom-0 left-1/2 transform -translate-x-1/2
        transition-all duration-300 ease-in-out
        bg-transparent   
        shadow-lg z-50
        ${
          isScrolled
            ? "w-auto mb-4 rounded-full bg-black/15 border"
            : "w-full border-none"
        }
      `}
    >
      <div className="flex justify-between items-center h-16 px-6 gap-4">
        <div className={`flex justify-start items-center gap-4`}>
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className={`
                flex flex-col items-center transition-colors
              bg-transparent border-none cursor-pointer
              ${
                currentPath === item.href
                  ? "text-white"
                  : "text-[#262626] hover:text-white"
              }
                `}
            >
              {/* {item.icon} */}
              <Link href={`${item.href}`}>
                <span
                  className={`
                    text-lg border-2 py-2 px-4 rounded-sm
                    ${isScrolled ? "text-lg" : "text-md"}
                    ${
                      currentPath === item.href
                        ? "border-white"
                        : "border-[#262626] hover:border-white"
                    }
                        `}
                >
                  {item.label}
                </span>
              </Link>
            </button>
          ))}
        </div>
        <div className="border-[#262626] border-2 rounded-sm p-2 hover:border-white">
          <Search className="h-6 w-6  " />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
